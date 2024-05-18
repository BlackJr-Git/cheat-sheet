import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { CategoryCard } from "..";

function CategoryCarousel({
  categories,
}: {
  categories: { id: number; name: string; icon: string }[];
}) {
  return (
    <Carousel className="block md:hidden">
      <CarouselContent className="-ml-1">
        {categories.map(
          (category: { id: number; name: string; icon: string }) => (
            <>
              <CarouselItem key={category.id} className="pl-[16px] basis-1/2">
                <CategoryCard key={category.id} category={category} />
              </CarouselItem>
            </>
          )
        )}
      </CarouselContent>
      {/* <CarouselPrevious /> */}
      {/* <CarouselNext /> */}
    </Carousel>
  );
}

export default CategoryCarousel;
