import { Breadcrumb as AntdBreadcrumb } from "antd";

interface BreadcrumbProps {
  items: any;
}

const Breadcrumb = (prop: BreadcrumbProps) => (
  <>
    <AntdBreadcrumb items={prop.items} />
  </>
);

export default Breadcrumb;
