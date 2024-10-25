import { Title } from "./components/title";
import { AlertDialogDemo } from "./components/alert-dialog-demo";
import { CardDemo } from "./components/card-demo";
import { SheetDemo } from "./components/sheet-demo";
import { PopoverDemo } from "./components/popover-demo";
import { ToastDemo } from "./components/toast-demo";
import { TypographyDemo } from "./components/typography-demo";

export default function Page() {
  return (
    <div className="flex flex-1 flex-col gap-4 p-4">
      <Title />
      <AlertDialogDemo />
      <CardDemo />
      <SheetDemo />
      <PopoverDemo />
      <ToastDemo />
      <TypographyDemo />
      {Array.from({ length: 24 }).map((_, index) => (
        <div
          key={index}
          className="aspect-video h-12 w-full rounded-lg bg-muted/50"
        />
      ))}
    </div>
  );
}
