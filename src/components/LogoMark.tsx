// Reusable Vox Front logo mark — V + sound wave
export function LogoMark({ size = 22, color = "white" }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M5 6L11.5 24C11.9 25.1 13.4 25.1 13.8 24L18 14"
        stroke={color}
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M16 9.5C17 9.5 17.8 8.8 18 7.8L18.3 6.2C18.4 5.6 18.9 5.2 19.5 5.2H20C20.7 5.2 21.3 5.8 21.2 6.5L20.8 9C20.6 10.4 21.6 11.6 23 11.6H23.4C24.8 11.6 25.8 12.8 25.6 14.2L25.2 16.7C25.1 17.4 25.7 18 26.4 18H26.7C27.4 18 27.9 17.5 28 16.8L28.3 15.2C28.5 14.2 29.3 13.5 30.3 13.5"
        stroke={color}
        strokeWidth="3"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
}
