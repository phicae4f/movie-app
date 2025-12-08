interface LogoComponentProps {
  imgSrc: string,
  imgSrcSet: string,
  width: number,
  height: number
}


export const LogoComponent = ({imgSrc, imgSrcSet, width, height}: LogoComponentProps) => {
  return (
    <div className="logo">
      <picture>
        <img
          className="logo__img"
          src={imgSrc}
          srcSet={imgSrcSet}
          alt="Логотип"
          width={width}
          height={height}
        />
      </picture>
    </div>
  );
};
