import { useEffect, useState } from "react";

const themes = [
    "light",
    "dark",
    "bumblebee",
    "retro",
    "cyberpunk",
    "valentine",
    "lofi",
    "luxury",
    "cmyk",
    "lemonade",
    "night",
];

export default function Navbar() {
    const [theme, setTheme] = useState(
        // ใช้ localStorage เพื่อเก็บ theme โดยถ้าไม่มี theme ใน localStorage ก็ให้ใช้ "light" เป็นค่าเริ่มต้น
        localStorage.getItem("theme") ? localStorage.getItem("theme") : "light"
    );

    useEffect(() => {
        // บันทึก theme ลงใน localStorage
        localStorage.setItem("theme", theme);
        document.querySelector("html").setAttribute("data-theme", theme);
    }, [theme]); // เมื่อ theme เปลี่ยนค่า

    // ฟังก์ชัน handleThemeChange เมื่อมีการเปลี่ยน theme
    const handleThemeChange = (selectTheme) => {
        // ตั้งค่า theme ใหม่
        setTheme(selectTheme);
        // บันทึก theme ใหม่ลงใน localStorage
        localStorage.setItem("theme", selectTheme);
    }



    return (
        <div class="dropdown mb-72">
            <div tabindex={0} role="button" class="btn m-1">
                Theme
                <svg width="12px" height="12px" class="h-2 w-2 fill-current opacity-60 inline-block" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048"><path d="M1799 349l242 241-1017 1017L7 590l242-241 775 775 775-775z"></path></svg>
            </div>
            <ul tabindex={0} class="dropdown-content z-[1] p-2 shadow-2xl bg-base-300 rounded-box w-52">
                {themes.map((theme) => (
                    <li key={theme}>
                        <input
                            type="radio"
                            name="theme-dropdown"
                            class="theme-controller btn btn-sm btn-block btn-ghost justify-start"
                            aria-label={theme}
                            value={theme}
                            onChange={() => handleThemeChange(theme)} /></li>
                ))}
            </ul>
        </div>
    )
}