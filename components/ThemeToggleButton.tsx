"use client"

import { useEffect, useState } from "react";
import Cookies from "js-cookie"

export default function ThemeToggleButton(){
    const [ theme, setTheme ] = useState("day");

    useEffect(() => {
        const savedTheme = Cookies.get("theme") || "day";
        setTheme(savedTheme)

        document.documentElement.classList.add(savedTheme)
    }, [])

    const toggleTheme = () => {
        const newTheme = theme === "day" ? "night" : "day"
        setTheme(newTheme)

        document.documentElement.classList.remove(theme)
        document.documentElement.classList.add(newTheme)

        Cookies.set("theme", newTheme, {expires: 30});
    }

    return (
        <button onClick={toggleTheme} className="flex m-3 p-3 bg-tertiary hover:bg-tertiaryContrast text-textButton rounded-full">{theme === "day" ? "Dark" : "Light"} Mode</button>
    )
}