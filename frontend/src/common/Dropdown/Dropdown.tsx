import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";

interface DropdownContextType {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const DropdownContext = createContext<DropdownContextType | null>(null);

export function useDropdown() {
  const context = useContext(DropdownContext);

  if (!context) {
    throw new Error("useDropdown must be used inside Dropdown");
  }

  return context;
}

interface DropdownProps {
  children: ReactNode;
}

export default function Dropdown({
  children,
}: DropdownProps) {
  const [open, setOpen] = useState(false);

  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        ref.current &&
        !ref.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () =>
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
  }, []);

  return (
    <DropdownContext.Provider
      value={{ open, setOpen }}
    >
      <div
        ref={ref}
        className="relative"
      >
        {children}
      </div>
    </DropdownContext.Provider>
  );
}