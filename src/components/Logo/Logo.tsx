import type React from 'react';

interface LogoProps {
  width?: string | number;
  height?: string | number;
  className?: string;
}

const Logo: React.FC<LogoProps> = ({
  width = '100%',
  height = '100%',
  className = '',
}) => {
  return (
    <svg
      role="logo"
      width={width}
      height={height}
      viewBox="0 0 87 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M6.17676 4.96667C6.17676 4.41439 6.63772 3.96667 7.20634 3.96667H19.0466C19.6152 3.96667 20.0762 4.41439 20.0762 4.96667V6.46667C20.0762 7.01896 19.6152 7.46667 19.0466 7.46667H7.20634C6.63772 7.46667 6.17676 7.01896 6.17676 6.46667V4.96667Z"
        fill="#FF4A00"
      />
      <path
        d="M7.20703 16.9667C7.20703 16.4144 7.66799 15.9667 8.23662 15.9667H18.0177C18.5863 15.9667 19.0473 16.4144 19.0473 16.9667V18.4667C19.0473 19.019 18.5863 19.4667 18.0177 19.4667H8.23662C7.66799 19.4667 7.20703 19.019 7.20703 18.4667V16.9667Z"
        fill="#FF4A00"
      />
      <path
        d="M1.54395 10.9667C1.54395 10.4144 2.00491 9.96667 2.57353 9.96667H14.4138C14.9824 9.96667 15.4434 10.4144 15.4434 10.9667V12.4667C15.4434 13.019 14.9824 13.4667 14.4138 13.4667H2.57353C2.00491 13.4667 1.54395 13.019 1.54395 12.4667V10.9667Z"
        fill="#FF4A00"
      />
      <path
        d="M25.8789 22.9C25.8789 23.1946 26.1231 23.4333 26.4244 23.4333H29.6332C29.9344 23.4333 30.1786 23.1945 30.1786 22.9V15.3398C30.1786 15.0452 30.4229 14.8065 30.7241 14.8065H37.3975C37.6987 14.8065 37.943 14.5677 37.943 14.2731V11.5636C37.943 11.2691 37.6987 11.0303 37.3975 11.0303H30.7241C30.4229 11.0303 30.1786 10.7915 30.1786 10.497V6.25243C30.1786 5.95788 30.4229 5.7191 30.7241 5.7191H40.461C40.7622 5.7191 41.0064 5.48032 41.0064 5.18577V2.47626C41.0064 2.18171 40.7622 1.94293 40.461 1.94293H26.4244C26.1231 1.94293 25.8789 2.18171 25.8789 2.47626V22.9Z"
        fill="#0000FF"
      />
      <path
        d="M57.5129 22.9C57.5129 23.1945 57.7571 23.4333 58.0584 23.4333H61.173C61.4743 23.4333 61.7185 23.1945 61.7185 22.9V1.24824C61.7185 0.953687 61.4743 0.714905 61.173 0.714905H58.0584C57.7571 0.714905 57.5129 0.953687 57.5129 1.24824V22.9Z"
        fill="#0000FF"
      />
      <path
        d="M66.466 5.47349C67.282 5.47349 67.9097 5.25859 68.3805 4.79808C68.8513 4.36827 69.071 3.75426 69.071 2.95605C69.071 2.18853 68.8513 1.60522 68.3805 1.14471C67.9097 0.714905 67.282 0.5 66.466 0.5C65.6186 0.5 64.9595 0.714905 64.5202 1.14471C64.0808 1.60522 63.8611 2.18853 63.8611 2.95605C63.8611 3.75426 64.0808 4.36827 64.5202 4.79808C64.9595 5.25859 65.6186 5.47349 66.466 5.47349ZM64.3318 22.9C64.3318 23.1945 64.5761 23.4333 64.8773 23.4333H67.992C68.2932 23.4333 68.5374 23.1945 68.5374 22.9V8.00236C68.5374 7.70781 68.2932 7.46903 67.992 7.46903H64.8773C64.5761 7.46903 64.3318 7.70781 64.3318 8.00236V22.9Z"
        fill="#0000FF"
      />
      <path
        d="M69.3556 23.197C69.3556 23.3275 69.4638 23.4333 69.5973 23.4333H73.6313C73.8217 23.4333 73.9983 23.3363 74.0972 23.1773L77.3262 17.9902C77.3465 17.9577 77.3825 17.9379 77.4214 17.9379C77.4605 17.9379 77.4967 17.9579 77.5168 17.9906L80.7148 23.1754C80.8136 23.3355 80.9908 23.4333 81.1819 23.4333H85.2142C85.3478 23.4333 85.4561 23.3274 85.4561 23.1968C85.4561 23.1508 85.4424 23.1058 85.4166 23.0673L80.4717 15.6797C80.3536 15.5034 80.3529 15.2757 80.4696 15.0986L85.2605 7.83473C85.2857 7.79642 85.2992 7.75179 85.2992 7.7062C85.2992 7.57521 85.1906 7.46903 85.0566 7.46903H81.0887C80.897 7.46903 80.7194 7.56736 80.6209 7.72805L77.5166 12.789C77.4966 12.8217 77.4605 12.8416 77.4216 12.8416C77.3826 12.8416 77.3465 12.8217 77.3265 12.789L74.2223 7.72805C74.1237 7.56736 73.9461 7.46903 73.7545 7.46903H69.787C69.6528 7.46903 69.5439 7.57542 69.5439 7.70666C69.5439 7.75197 69.5572 7.79633 69.5821 7.83452L74.3441 15.1293C74.4597 15.3065 74.4582 15.5335 74.3402 15.7092L69.3953 23.0672C69.3694 23.1058 69.3556 23.1509 69.3556 23.197Z"
        fill="#0000FF"
      />
      <path
        d="M46.5352 5.28203C46.5352 5.42168 46.6509 5.53489 46.7938 5.53489H49.3824C49.5644 5.53489 49.7344 5.44611 49.8357 5.2982L52.4554 1.47082C52.482 1.43207 52.4961 1.38648 52.4961 1.33985V1.33985C52.4961 1.2098 52.3883 1.10437 52.2553 1.10437H48.781C48.5662 1.10437 48.3714 1.22767 48.2834 1.41931L46.5578 5.17849C46.5429 5.21105 46.5352 5.24634 46.5352 5.28203V5.28203Z"
        fill="#0000FF"
      />
      <path
        d="M45.2672 7.58703C46.7264 7.07121 48.1778 6.95824 49.6216 7.24811C51.0654 7.53799 52.3347 8.17353 53.4295 9.15473C54.5316 10.1204 55.338 11.3197 55.8485 12.7527C56.0162 13.2355 55.9938 13.6694 55.7811 14.0544C55.5642 14.4279 55.2397 14.6911 54.8078 14.8438L44.8624 18.3596C45.5022 19.1144 46.2944 19.6411 47.2391 19.9396C48.1912 20.2226 49.1342 20.199 50.068 19.8689C51.0719 19.514 52.0006 18.7468 52.8541 17.5674C52.9569 17.4536 53.055 17.3802 53.1484 17.3472C53.2768 17.3018 53.4191 17.3289 53.5754 17.4285L54.5022 18.0496C54.919 18.3153 55.262 18.5426 55.531 18.7314C55.6438 18.8207 55.7215 18.9223 55.7642 19.0362C55.8155 19.173 55.802 19.3133 55.7237 19.4572C54.6507 21.3209 53.1686 22.587 51.2776 23.2555C49.7951 23.7795 48.297 23.909 46.7831 23.6439C45.281 23.3747 43.938 22.7716 42.7541 21.8349C41.5776 20.8825 40.7224 19.694 40.1885 18.2693C39.6504 16.8332 39.5072 15.393 39.7592 13.9486C40.0227 12.5001 40.6371 11.2116 41.6022 10.0831C42.5631 8.94311 43.7848 8.1111 45.2672 7.58703ZM46.5904 11.2239C45.5982 11.5746 44.8369 12.1536 44.3065 12.9606C43.7719 13.7563 43.5602 14.6378 43.6716 15.6053L51.4284 12.8632C50.8851 12.0484 50.1862 11.4887 49.3318 11.1841C48.4731 10.8681 47.5593 10.8814 46.5904 11.2239Z"
        fill="#0000FF"
      />
    </svg>
  );
};

export default Logo;
