import Quill, { Delta, Op, type QuillOptions } from "quill";
import "quill/dist/quill.snow.css";
import { PiTextAa } from "react-icons/pi";
import {
  MutableRefObject,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { Button } from "./ui/button";
import { ImageIcon, Smile } from "lucide-react";
import { IoSend } from "react-icons/io5";
import { Hint } from "./hint";
import Keyboard from "quill/modules/keyboard";
import { EmojiPopover } from "./ui/emoji-popover";

Quill.register("modules/keyboard", Keyboard);
interface EditorValue {
  file: File | null;
  body: string;
}
interface EditorProps {
  variant?: "create" | "update";
  onSubmit: ({ file, body }: EditorValue) => void;
  onCancel?: () => void;
  disabled?: boolean;
  placeholder: string;
  defaultValue?: Delta | Op[];
  innerRef?: MutableRefObject<Quill | null>;
}
const Editor = ({
  variant = "create",
  onSubmit,
  placeholder = "Write Something...",
  defaultValue = [],
  innerRef,
  disabled = false,
  onCancel,
}: EditorProps) => {
  const [text, setText] = useState("");
  const [image, setImage] =useState<File | null>(null);
  const [isTogglerVisible, setIsTogglerVisible] = useState(false);
  const editorRef = useRef<HTMLDivElement>(null);
  //we dont want to add dependency value to the useEffect for that we can use
  const submitRef = useRef(onSubmit);
  const placeholderRef = useRef(placeholder);
  const quillRef = useRef<Quill | null>(null);
  const defaultValueRef = useRef(defaultValue);
  const disabledRef = useRef(disabled);
  const imageElementRef  = useRef<HTMLInputElement>(null)
  useLayoutEffect(() => {
    submitRef.current = onSubmit;
    placeholderRef.current = placeholder;
    defaultValueRef.current = defaultValue;
    disabledRef.current = disabled;
  });
  useEffect(() => {
    if (!editorRef.current) return;
    const editor = editorRef.current;
    const editorContainer = editor.appendChild(
      editor?.ownerDocument.createElement("div")
    );
    const options: QuillOptions = {
      theme: "snow",
      placeholder: placeholderRef.current,
      modules: {
        toolbar: [
          ["bold", "italic", "strike"],
          ["link"],

          [{ list: "ordered" }, { list: "bullet" }],
        ],
        Keyboard: {
          bindings: {
            enter: {
              key: "Enter",
              shiftKey: true,
              handler: () => {
                quill.insertText(quill.getSelection()?.index || 0, "\n");
              },
            },
          },
        },
      },
    };
    const quill = new Quill(editorContainer, options);
    quillRef.current = quill;
    quillRef.current.focus();
    if (innerRef) {
      innerRef.current = quill;
    }
    quill.setContents(defaultValueRef.current);
    setText(quill.getText());
    //EVENT LISTEN
    quill.on(Quill.events.TEXT_CHANGE, () => {
      setText(quill.getText());
    });
    return () => {
      //also off the event
      quill.off(Quill.events.TEXT_CHANGE);
      if (editor) {
        editor.innerHTML = "";
      }
      if (quillRef.current) {
        quillRef.current = null;
      }
      if (innerRef) {
        innerRef.current = null;
      }
    };
  }, [innerRef]);
  const handleTogglebarVisible = () => {
    setIsTogglerVisible((current) => !current);
    const togglerElement = editorRef.current?.querySelector(".ql-toolbar");
    if (togglerElement) {
      togglerElement.classList.toggle("hidden");
    }
  };
  const isEmpty = text.replace(/<(.|\n)*?>/g, "").trim().length === 0;
const onSelectEmoji = (emoji:any) =>{
 const quill = quillRef.current;
 quill?.insertText(quill?.getSelection()?.index || 0, emoji.native)
}
  return (
    <div
      className="flex flex-col border border-slate-200 rounded-md overflow-hidden
         focus-within:border-slate-300 focus-within:shadow-sm transition bg-white "
    >
      <input type="file" className="hidden" accept="image/*" ref={imageElementRef} onChange={(event) =>setImage(event.target.files![0])}/>
      <div ref={editorRef} className="ql-custom" />
      <div className="flex px-2 pb-2 z-[5px] hover:cursor-pointer">
        <Hint label={isTogglerVisible ? "show formatting" : "hide formatting"}>
          <Button
            disabled={disabled}
            size="iconSm"
            variant="ghost"
            onClick={handleTogglebarVisible}
          >
            <PiTextAa className="size-5" />
          </Button>
        </Hint>
        <EmojiPopover onEmojiSelect={onSelectEmoji}>
          <Button
            disabled={disabled}
            size="iconSm"
            variant="ghost"
          >
            <Smile className="size-5" />
          </Button>
        </EmojiPopover>

        {variant === "create" && (
          <Hint label="Upload Files">
            <Button
              disabled={disabled}
              size="iconSm"
              variant="ghost"
              onClick={() => imageElementRef.current?.click()}
            >
              <ImageIcon className="size-5" />
            </Button>
          </Hint>
        )}

        {variant === "update" ? (
          <div className="ml-auto flex items-center gap-x-2">
            <Button>Cancel</Button>
            <Button className="ml-auto bg-[#007a5a] hover:bg-[#007a5a]/80 text-white">
              Save
            </Button>
          </div>
        ) : (
          <Button
            disabled={disabled || isEmpty}
            size="iconSm"
            className="ml-auto bg-[#007a5a] hover:bg-[#007a5a]/80 text-white"
          >
            <IoSend />
          </Button>
        )}
      </div>
      {variant === "create" && (
        <div className="ml-auto items-center">
          <p>
            <strong>Shift + Return</strong> to add a new line
          </p>
        </div>
      )}
    </div>
  );
};
export default Editor;
