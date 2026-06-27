import React, { createContext, useState } from "react";

const ChatContext = createContext()

export const ChatProvider = ({chidren}) => {
    const [activeChat, setActiveChat] = useState(null);
    const [selectUser, setSelectUser] = useState(null);

    return (
        <ChatContext.Provider value={{activeChat, selectUser, setActiveChat, setSelectUser}}>
            {chidren}
        </ChatContext.Provider>
    )
}