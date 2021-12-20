import { Accordion, Card, useAccordionButton } from 'react-bootstrap'
import ArrowDown from '../assets/icon/ArrowDown';
import { dark, bgColor, lavender } from '../constants/Color';

const CAccordion = (props: any) => {
  const {
    cards,
    defaultActiveKey,
    cardStyle,
    cardHeaderStyle,
    buttonStyle,
    cardBody,
    arrowSize,
    arrowColor,
  } = props;
  const margin = 16;
  const paddingTop = 12;

  const styles = {
    card: {
      backgroundColor: bgColor,
      marginLeft: margin,
      marginRight: margin,
    },
    cardHeader: {
      paddingTop: paddingTop,
      backgroundColor: dark,
    },
    cardBody: {
      backgroundColor: dark,
      paddingTop: 2,
    },
    header: {
      display: 'flex',
      justifyContent: 'space-between',
      backgroundColor: 'transparent',
    },
  } as const

  const CustomToggle = ({ children, eventKey }: any) => {
      const decoratedOnClick = useAccordionButton(eventKey, () => {})

      return (
        <div role="button" style={{...styles.header, ...buttonStyle}} onClick={decoratedOnClick}>
          {children}
          <ArrowDown width={arrowSize ? arrowSize : '16'} color={arrowColor ? arrowColor : lavender} />
        </div>
      )
  }

  return (
    <>
      <Accordion defaultActiveKey={defaultActiveKey}>
        {cards.map((item: Array<any>, index: string) => (
          <Card key={index + ''} style={{ ...styles.card, ...cardStyle }}>
            <Card.Header style={{ ...styles.cardHeader, ...cardHeaderStyle }}>
              <CustomToggle eventKey={index + ''}>
                {item[0]}
              </CustomToggle>
            </Card.Header>
            <Accordion.Collapse eventKey={index + ''}>
              <Card.Body style={{ ...styles.cardBody, ...cardBody }}>
                {item[1]}
              </Card.Body>
            </Accordion.Collapse>
          </Card>
        ))}
      </Accordion>
    </>
  )
}


export default CAccordion
