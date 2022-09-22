// (c) Tecnologico de Monterrey 2022, rights reserved.

import { useState } from "react";


  const Pagination = (): JSX.Element => {

  
 const [pageCount, setPageCount] = useState(0)
    
    const onPageChange = ({selected}: { selected: number }): void => {
        // setCount(count + 1)
    }
  
    return (
      <>
        {/* <Pagination
        currentPage={pageCount}
        onPageChange={onPageChange}
        showIcons={true}
        totalPages={100}
        /> */}
      </>
    );
  };
  
  export default Pagination;