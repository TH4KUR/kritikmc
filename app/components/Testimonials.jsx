import getTestimonials from "../lib/getTestimonials";
import TestimonialsCarousel from "./TestimonialsCarousel";

const Testimonials = async () => {
  const testimonials = await getTestimonials();
  return (
    <section class="py-24 ">
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div class="mb-16 ">
          <span class="text-lg text-accent font-bold text-center block mb-2">
            TESTIMONIAL
          </span>
          <h2 class="text-2xl md:text-4xl text-center font-bold text-gray-900 ">
            What our past participants say!
          </h2>
        </div>

        <div class="lg:w-4/5 mx-auto">
          <TestimonialsCarousel data={testimonials} />
          {/* <div class="swiper-wrapper w-max"></div>
          <div class="swiper-pagination"></div> */}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
