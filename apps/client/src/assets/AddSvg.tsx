import type { SVGProps } from "react";

const AddSvg = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width={48}
    xmlns="http://www.w3.org/2000/svg"
    height={48}
    id="screenshot-b6ac8b2d-f38f-566b-80da-233830dc90f7"
    viewBox="0 0 48 48"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    fill="none"
    {...props}
  >
    <g id="shape-b6ac8b2d-f38f-566b-80da-233830dc90f7">
      <defs>
        <clipPath
          id="frame-clip-b6ac8b2d-f38f-566b-80da-233830dc90f7-render-1"
          className="frame-clip frame-clip-def"
        >
          <rect
            rx={0}
            ry={0}
            x={0}
            y={0}
            width={48}
            height={48}
            transform="matrix(1.000000, 0.000000, 0.000000, 1.000000, 0.000000, 0.000000)"
          />
        </clipPath>
      </defs>
      <g className="frame-container-wrapper" opacity={1}>
        <g className="frame-container-blur">
          <g className="frame-container-shadows">
            <g
              clipPath="url(#frame-clip-b6ac8b2d-f38f-566b-80da-233830dc90f7-render-1)"
              fill="none"
            >
              <g
                className="fills"
                id="fills-b6ac8b2d-f38f-566b-80da-233830dc90f7"
              >
                <rect
                  width={48}
                  height={48}
                  className="frame-background"
                  x={0}
                  transform="matrix(1.000000, 0.000000, 0.000000, 1.000000, 0.000000, 0.000000)"
                  style={{
                    fill: "rgb(255, 255, 255)",
                    fillOpacity: 0,
                  }}
                  ry={0}
                  rx={0}
                  y={0}
                />
              </g>
              <g className="frame-children">
                <g
                  id="shape-be83923d-7fd1-52e6-97aa-e9ee7c3afcd3"
                  style={{
                    opacity: 1,
                  }}
                >
                  <g
                    className="fills"
                    id="fills-be83923d-7fd1-52e6-97aa-e9ee7c3afcd3"
                  >
                    <path
                      d="M19,4L27,3L28,19L43,17L44,26L29,28L30,44L22,45L21,29L5,31L4,22L20,20L19,4Z"
                      fillRule="nonzero"
                      style={{
                        fill: "currentColor",
                        fillOpacity: 1,
                      }}
                    />
                  </g>
                </g>
              </g>
            </g>
          </g>
        </g>
      </g>
    </g>
  </svg>
);
export default AddSvg;
