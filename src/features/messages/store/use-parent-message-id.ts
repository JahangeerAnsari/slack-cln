import {useQueryState} from 'nuqs'
export const useParentMessageId = () =>{
    //its is simillar
  // const [parentMessageId, setParentMessageId] = useState("localhost:3000?parentMessageId")
    return useQueryState('parentMessageId')
}