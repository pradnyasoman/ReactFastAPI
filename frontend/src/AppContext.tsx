import * as React from "react";

type PartnerData = any;

/**
 * Interface to set data and current page while switching components.
 * @interface
 */
export interface ContextProps {
  currentPage: string;
  setCurrentPage: React.Dispatch<React.SetStateAction<string>>;
  data: PartnerData | null;
  setData: React.Dispatch<React.SetStateAction<PartnerData | null>>;
}

export const AppContext = React.createContext<ContextProps | undefined>(
  undefined
);
