import { createContext, ReactNode, useContext, useState } from "react";

interface SettingContextProps {
    initialMenuOpen: boolean;
    setInitialMenuOpen: (value: boolean) => void;
}

const SettingContext = createContext<SettingContextProps | undefined>(undefined);

export const SettingProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [initialMenuOpen, setInitialMenuOpen] = useState(true);

    return (
        <SettingContext.Provider value={{ initialMenuOpen, setInitialMenuOpen }}>
            {children}
        </SettingContext.Provider>
    );
};

export const useSettingContext = () => {
    const context = useContext(SettingContext);
    if (!context) {
        throw new Error("useSettingContext  deve ser usado dentro de um SettingProvider");
    }
    return context;
};