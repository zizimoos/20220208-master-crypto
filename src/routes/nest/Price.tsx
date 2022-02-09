import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { coinDetail } from "../../Api";
import { ICoinDetail } from "../../Interface";
import styled from "styled-components";
import { BsPersonCircle } from "react-icons/bs";
import {
  AiFillChrome,
  AiOutlineTwitter,
  AiOutlineFacebook,
  AiFillYoutube,
  AiOutlineCoffee,
  AiFillGithub,
  AiFillRedditCircle,
} from "react-icons/ai";

const Overview = styled.div`
  width: 90vw;
  margin-bottom: 20px;
  padding: 10px 20px;
  border-radius: 10px;
  line-height: 1.2;
  display: flex;
  justify-content: space-between;
  color: ${(props) => props.theme.colors.textColor};
  background-color: rgba(0, 0, 0, 0.5);
  @media only screen and (min-width: 800px) {
    width: 600px;
  }
`;
const Title = styled.div`
  margin-bottom: 10px;
  margin-left: 10px;
  color: ${(props) => props.theme.colors.textColor};
`;
const TeamMember = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  div:first-child {
    margin-right: 10px;
  }
`;
const LinksExtended = styled.div`
  color: ${(props) => props.theme.colors.textColor};
  div {
    margin-bottom: 5px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    div:first-child {
      margin-right: 10px;
      font-size: 1.2rem;
    }
    a {
      color: ${(props) => props.theme.colors.textColor};
      text-decoration: none;
    }
  }
`;

const Price = () => {
  const { id } = useParams();
  const { isLoading: detailLoading, data: detailInfo } = useQuery<ICoinDetail>(
    ["coinDetail", id],
    () => coinDetail(id!)
  );
  return (
    <div>
      {detailLoading ? (
        <div>Loading...</div>
      ) : (
        <div>
          <Title>Description</Title>
          <Overview>{detailInfo?.description}</Overview>
          <Title>Contract</Title>
          <Overview>{detailInfo?.contract}</Overview>
          <Overview>Started at {detailInfo?.started_at}</Overview>
          <Overview>First data at {detailInfo?.first_data_at}</Overview>
          <Title>Proof Type</Title>
          <Overview>{detailInfo?.proof_type}</Overview>
          <Title>White Paper</Title>
          <Overview>{detailInfo?.whitepaper.link}</Overview>
          <Title>Source Code</Title>
          <Overview>{detailInfo?.links.source_code[0]}</Overview>
          <Title>Team Member</Title>
          <Overview>
            <ul>
              {detailInfo?.team.map((man, index) =>
                man ? (
                  <TeamMember key={index}>
                    <div>
                      <BsPersonCircle />
                    </div>
                    <div>
                      {man.name} : {man.position}
                    </div>
                  </TeamMember>
                ) : (
                  <BsPersonCircle />
                )
              )}
            </ul>
          </Overview>
          <Title>Links</Title>
          <Overview>
            <LinksExtended>
              {detailInfo?.links_extended.map((link, index) => (
                <div key={index}>
                  <div>
                    <a href={link.url}>
                      {link.type === "explorer" ? (
                        <AiFillChrome />
                      ) : link.type === "twitter" ? (
                        <AiOutlineTwitter />
                      ) : link.type === "facebook" ? (
                        <AiOutlineFacebook />
                      ) : link.type === "youtube" ? (
                        <AiFillYoutube />
                      ) : link.type === "wallet" ? (
                        <AiFillGithub />
                      ) : link.type === "source_code" ? (
                        <AiFillGithub />
                      ) : link.type === "reddit" ? (
                        <AiFillRedditCircle />
                      ) : (
                        <AiOutlineCoffee />
                      )}
                    </a>
                  </div>
                  <div>{link.url}</div>
                </div>
              ))}
            </LinksExtended>
          </Overview>
        </div>
      )}
    </div>
  );
};
export default Price;
