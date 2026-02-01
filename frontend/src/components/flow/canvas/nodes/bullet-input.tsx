import { useState, useRef, useEffect } from "react";
import { Textarea } from "@/components/ui/textarea";

export function BulletInput({
  list,
  onInput,
}: {
  list: string[];
  onInput: (points: string[]) => void;
}) {
  const [value, setValue] = useState(() => {
    return list?.map((item) => "• " + item).join("\n") || "• ";
  });
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const getBulletsArray = (val: string) => {
    return val
      .split("\n")
      .map((line) => line.replace(/^•\s*/, "").trim())
      .filter((line) => line.length > 0);
  };

  useEffect(() => {
    onInput(getBulletsArray(value));
  }, [value]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const textarea = e.currentTarget;
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      const before = value.substring(0, start);
      const after = value.substring(end);

      const newValue = `${before}\n• `;
      setValue(newValue + after);

      requestAnimationFrame(() => {
        textarea.selectionStart = textarea.selectionEnd = start + 3;
      });
    }

    if (e.key === "Backspace" && value === "• ") {
      e.preventDefault();
    }
  };

  useEffect(() => {
    // textareaRef.current?.focus()
    textareaRef.current?.setSelectionRange(value.length, value.length);
  }, []);

  const handleOnChange = (e: any) => {
    const bulletArray = getBulletsArray(e.target.value);
    const re = /•\s*$/;
    for (const bullet of bulletArray) {
      if (re.test(bullet)) {
        e.preventDefault();
        return;
      }
    }
    setValue(e.target.value);
  };

  return (
    <div className="space-y-3">
      <Textarea
        ref={textareaRef}
        value={value}
        onChange={handleOnChange}
        onKeyDown={handleKeyDown}
        rows={6}
        className="whitespace-pre-wrap"
      />
    </div>
  );
}
