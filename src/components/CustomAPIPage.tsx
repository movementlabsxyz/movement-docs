import { APIPage } from 'fumadocs-openapi/ui';

interface CustomAPIPageProps {
  document: string;
  operations: any[];
  webhooks?: any[];
  hasHead?: boolean;
}

export function CustomAPIPage(props: CustomAPIPageProps) {
  // Just pass through the props - let the generated files handle the path
  return <APIPage {...props} hasHead={props.hasHead ?? false} />;
} 