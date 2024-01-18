export default function ReplicateLogo({ width, height, className, fill }) {
    return (
      <svg
        className={className}
        x="0px"
        y="0px"
        viewBox="0 0 1000 1000"
        fill={fill || "#ffffff"}
        width={width}
        height={height}
      >
        <polygon points="1000,427.6 1000,540.6 603.4,540.6 603.4,1000 477,1000 477,427.6 	"></polygon>
        <polygon points="1000,213.8 1000,327 364.8,327 364.8,1000 238.4,1000 238.4,213.8 	"></polygon>
        <polygon points="1000,0 1000,113.2 126.4,113.2 126.4,1000 0,1000 0,0 	"></polygon>
      </svg>
    );
  }