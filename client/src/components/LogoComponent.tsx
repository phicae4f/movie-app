interface LogoComponentProps {
  mobileSrc?: string,
  mobileSrc2x?: string,
  desktopSrc?: string,
  desktopSrc2x?: string,
  width: number,
  height: number
}


export const LogoComponent = ({mobileSrc, mobileSrc2x, desktopSrc, desktopSrc2x, width, height}: LogoComponentProps) => {
  return (
    <div className="logo">
      <picture>
        {mobileSrc && (
        <source media="(max-width: 767px)" srcSet={`${mobileSrc} 1x, ${mobileSrc2x} 2x`}/>
      )}
        <img
          className="logo__img"
          src={desktopSrc}
          srcSet={desktopSrc2x}
          alt="Логотип"
          width={width}
          height={height}
        />
      </picture>
    </div>
  );
};
