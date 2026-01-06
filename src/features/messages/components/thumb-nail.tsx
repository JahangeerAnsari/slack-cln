import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import Image from "next/image";

interface ThumbnailProps {
  url: string | null | undefined;
}
const Thumbnail = ({ url }: ThumbnailProps) => {
  console.log("url====>", url);

  if (!url) {
    return null;
  }
  return (
    <Dialog>
      <DialogTrigger>
        <div className="relative overflow-hidden max-w-[360px] border  rounded-lg my-2 cursor-zoom-in">
          <Image
            alt="message image"
            className="object-cover w-full rounded-md"
            src={url}
            width={50}
            height={100}
          />
        </div>
      </DialogTrigger>
      <DialogContent>
        <div className="relative overflow-hidden max-w-[360px] border  rounded-lg my-2 cursor-zoom-in">
          <Image
            alt="message image"
            className="object-cover w-full rounded-md"
            src={url}
            width={50}
            height={100}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default Thumbnail;
