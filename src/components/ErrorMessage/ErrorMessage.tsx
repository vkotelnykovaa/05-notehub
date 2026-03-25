// src/components/ErrorMessage/ErrorMessage.tsx
interface Props {
  message: string;
}
export default function ErrorMessage({ message }: Props) {
  return <p>{message}</p>;
}
