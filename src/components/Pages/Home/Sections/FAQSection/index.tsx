import { OfferSection } from '@assets/styles/pages.style';
import MultiCarousel from "@components/carousel/carousel";
import QuestionsCard from '../../Partials/QuestionsCard';


const FAQSection: React.FC<any> = ({deviceType, faqItems}) => {
    return (
        <OfferSection style={{ backgroundColor: "#F3F3F3" }}>
        <h3 className="text-center mb-4 mt-4 mt-md-0" style={{fontWeight: 'bold'}}>سوالات متداول</h3>
        <MultiCarousel
          data={faqItems}
          deviceType={deviceType}
          component={QuestionsCard}
        />
      </OfferSection>
    )
}


export default FAQSection;