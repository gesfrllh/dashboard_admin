
import { useState } from "react"


export const useClose = (closeNow = true): [boolean, () => void] => {
    const  [close, setClose] = useState<boolean>(closeNow);

    const toggle = () => {
        setClose(!close)
    }

    return [close, toggle];
}   