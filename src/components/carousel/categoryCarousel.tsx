import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { CategoryCard } from "..";
import { CategoryType } from "@/types";

function CategoryCarousel({
  categories,
}: {
  categories: CategoryType[];
}) {
  return (
    <Carousel className="block md:hidden">
      <CarouselContent className="-ml-1">
        {categories.map(
          (category: CategoryType) => (
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
