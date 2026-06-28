import React, { createContext, useContext, useState } from "react";

const ChatContext = createContext()

export const ChatProvider = ({children}) => {
    const [activeChat, setActiveChat] = useState(null);
    const [selectUser, setSelectUser] = useState(null);

    return (
        <ChatContext.Provider value={{activeChat, selectUser, setActiveChat, setSelectUser}}>
            {children}
        </ChatContext.Provider>
    )
}

export const useChatState = () => useContext(ChatContext);