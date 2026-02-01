import { cn } from "@/lib/utils";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";

export default function Confidence({
  confidence,
  onConfidenceChange,
}: {
  confidence: number;
  onConfidenceChange: (confidence: number) => void;
}) {
  const max = 100;
  const skipInterval = 10;
  const ticks = [...Array(max + 1)].map((_, i) => i);

  return (
    <div className="space-y-4">
      <Label>Confidence</Label>

      <div className="relative">
        <Slider
          defaultValue={confidence ? [confidence] : [50]}
          max={max}
          step={10}
          className="w-full"
          aria-label="Slider with ticks"
          onValueChange={(val) => onConfidenceChange(val[0])}
        />

        <div
          className="mt-3 grid text-xs font-medium text-muted-foreground px-1"
          style={{
            gridTemplateColumns: `repeat(${ticks.length}, minmax(0, 1fr))`,
          }}
          aria-hidden="true"
        >
          {ticks.map((_, i) => (
            <div key={i} className="flex flex-col items-center">
              <span
                className={cn(
                  "bg-muted-foreground/70 w-[0.1px]",
                  i % skipInterval === 0 ? "h-1" : "h-0",
                )}
              />
              <span
                className={cn("mt-1", i % skipInterval !== 0 && "opacity-0")}
              >
                {i}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
