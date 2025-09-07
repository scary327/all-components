// "use client";

// import {
//   useSearchParams as useNextSearchParams,
//   usePathname,
//   useRouter,
// } from "next/navigation";
// import { useCallback } from "react";

// type ParamValue = string | number | boolean | null | undefined;
// type ParamsUpdate = Record<string, ParamValue>;

// interface UseSearchParamsReturn {
//   searchParams: URLSearchParams;
//   setParam: (key: string, value: ParamValue, replace?: boolean) => void;
//   setParams: (params: ParamsUpdate, replace?: boolean) => void;
//   removeParam: (key: string, replace?: boolean) => void;
//   removeParams: (keys: string[], replace?: boolean) => void;
//   clearParams: (replace?: boolean) => void;
//   getParam: (key: string) => string | null;
//   hasParam: (key: string) => boolean;
// }

// export const useCustomSearchParams = (): UseSearchParamsReturn => {
//   const searchParams = useNextSearchParams();
//   const pathname = usePathname();
//   const router = useRouter();

//   const updateURL = useCallback(
//     (newParams: URLSearchParams, replace = false) => {
//       const url = `${pathname}?${newParams.toString()}`;

//       if (replace) {
//         router.replace(url);
//       } else {
//         router.push(url);
//       }
//     },
//     [pathname, router]
//   );

//   const setParam = useCallback(
//     (key: string, value: ParamValue, replace = false) => {
//       const params = new URLSearchParams(searchParams.toString());

//       if (value === null || value === undefined || value === "") {
//         params.delete(key);
//       } else {
//         params.set(key, String(value));
//       }

//       updateURL(params, replace);
//     },
//     [searchParams, updateURL]
//   );

//   const setParams = useCallback(
//     (paramsUpdate: ParamsUpdate, replace = false) => {
//       const params = new URLSearchParams(searchParams.toString());

//       Object.entries(paramsUpdate).forEach(([key, value]) => {
//         if (value === null || value === undefined || value === "") {
//           params.delete(key);
//         } else {
//           params.set(key, String(value));
//         }
//       });

//       updateURL(params, replace);
//     },
//     [searchParams, updateURL]
//   );

//   const removeParam = useCallback(
//     (key: string, replace = false) => {
//       const params = new URLSearchParams(searchParams.toString());
//       params.delete(key);
//       updateURL(params, replace);
//     },
//     [searchParams, updateURL]
//   );

//   const removeParams = useCallback(
//     (keys: string[], replace = false) => {
//       const params = new URLSearchParams(searchParams.toString());
//       keys.forEach((key) => params.delete(key));
//       updateURL(params, replace);
//     },
//     [searchParams, updateURL]
//   );

//   const clearParams = useCallback(
//     (replace = false) => {
//       const params = new URLSearchParams();
//       updateURL(params, replace);
//     },
//     [updateURL]
//   );

//   const getParam = useCallback(
//     (key: string) => {
//       return searchParams.get(key);
//     },
//     [searchParams]
//   );

//   const hasParam = useCallback(
//     (key: string) => {
//       return searchParams.has(key);
//     },
//     [searchParams]
//   );

//   return {
//     searchParams,
//     setParam,
//     setParams,
//     removeParam,
//     removeParams,
//     clearParams,
//     getParam,
//     hasParam,
//   };
// };
