interface LogoProps {
  size?: number;
  color?: string;
  title?: string;
}

export function Logo({ size = 32, color = 'var(--rf-color-brand)', title = 'Rollfi' }: LogoProps) {
  const width = (size * 800) / 300;
  return (
    <svg
      width={width}
      height={size}
      viewBox="0 0 800 300"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ color, display: 'block' }}
      role="img"
      aria-label={title}
    >
      <title>{title}</title>
      <g clipPath="url(#rf-logo-clip)">
        <path d="M254.4 121.025L227.663 93.8675L155.761 165.765V218.868L155.949 219.055L254.4 121.025ZM290.047 299.681L192.016 201.23L164.859 227.967L236.758 299.868H289.859L290.047 299.681ZM236.574 84.9565L334.607 183.41L361.764 156.674L289.865 84.7695H236.761L236.574 84.9565ZM298.958 290.77L370.86 218.867V165.4L272.222 263.613L298.958 290.77Z" fill="currentColor" />
      </g>
      <path d="M739.999 88.2803H793.884V300H739.999V88.2803ZM734.266 31.7198C734.266 13.758 748.024 0 767.132 0C786.241 0 799.999 13.758 799.999 31.7198C799.999 49.2994 786.241 63.0573 767.132 63.0573C748.024 63.0573 734.266 49.2994 734.266 31.7198Z" fill="currentColor" />
      <path d="M609.226 83.3118C609.226 29.4264 638.653 2.6748 700.181 2.6748H719.29V47.3882H697.506C672.665 47.3882 663.493 56.5602 663.493 79.8723V300H609.226V132.611H585.149V88.2799H609.226V83.3118ZM663.493 132.611L691.391 88.2799H719.29V132.611H663.493Z" fill="currentColor" />
      <path d="M500.578 43.9493L554.463 3.05762V300H500.578V43.9493Z" fill="currentColor" />
      <path d="M397.661 43.9493L451.547 3.05762V300H397.661V43.9493Z" fill="currentColor" />
      <path d="M0 88.2803H53.8854V300H0V88.2803ZM53.8854 144.841L89.4267 88.2803H134.904V144.841H53.8854Z" fill="currentColor" />
      <defs>
        <clipPath id="rf-logo-clip">
          <rect width="215.099" height="215.099" fill="white" transform="translate(155.761 84.7695)" />
        </clipPath>
      </defs>
    </svg>
  );
}
