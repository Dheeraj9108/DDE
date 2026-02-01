import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Link } from "react-router-dom";

export function BreadcrumbComponent(props: any) {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        {props.data.map((breadcrumb: any,index:number) => {
          return (
            <>
              <BreadcrumbItem className="hidden md:block">
                <Link to={breadcrumb.url}>{breadcrumb.item}</Link>
              </BreadcrumbItem>
              {index < props.data.length-1 && <BreadcrumbSeparator className="hidden md:block" />}
            </>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
