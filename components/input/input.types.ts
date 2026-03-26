export interface InputProps {
  placeholder: string;
  id: string;
  type: string;
  name: string;
  autoComplete?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  error?: boolean;
  helperText?: string;
  inputRef?: React.Ref<HTMLInputElement>;
  className?: string;
  maxLength?: number;
}
