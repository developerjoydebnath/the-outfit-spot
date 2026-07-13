import Link from "next/link";
import { Container } from "@/components/shared/container";
import { Button } from "@/components/ui/button";
import { PackageSearch } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <Container>
        <div className="flex flex-col items-center text-center py-16 gap-4">
          <div className="text-muted-foreground/40">
            <PackageSearch className="h-20 w-20 mx-auto" aria-hidden />
          </div>
          <h1 className="text-4xl font-extrabold text-foreground">404</h1>
          <p className="text-lg font-semibold text-foreground">Page Not Found</p>
          <p className="text-sm text-muted-foreground max-w-xs">
            The page you&apos;re looking for doesn&apos;t exist or has been moved.
          </p>
          <div className="flex gap-3 mt-2">
            <Link href="/">
              <Button>Go Home</Button>
            </Link>
            <Link href="/products/">
              <Button variant="outline">Browse Products</Button>
            </Link>
          </div>
        </div>
      </Container>
    </div>
  );
}
