import PowerIcon from "../assets/icons/power.svg";

interface HeaderProps {
    onLogout: () => void;
}

export default function Header({ onLogout }: HeaderProps) {
    return (
        <header className="bg-primary flex h-20 items-center justify-between px-9 text-white">
            <h1 className="text-xl font-bold">CodeLeap Network</h1>
            <button
                onClick={onLogout}
                className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-white hover:bg-red-400"
            >
                <img src={PowerIcon} alt="Power icon" className="h-5 w-5" />
            </button>
        </header>
    );
}
