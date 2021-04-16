import { useState, useEffect } from 'react';
import Rating from 'react-rating';
import { Button, Carousel, Container, Col, Row } from 'react-bootstrap';
import { useRouter } from 'next/router';

// Components
import NumberFormat from 'react-number-format';
import BasicTopBar from '../../components/modules/Header';
import Reviews from '../../components/modules/Reviews';
import Layout from '../../components/layouts/app';
import '../../styles/itinerary.scss';

// Icons
import {
  StarFilledIcon,
  StarOutlineIcon,
} from '../../components/elements/Icons';

function Itinerary() {
  /* eslint no-shadow: "off" */
  const { id } = useRouter().query;
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);

    if (id) {
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/itinerary/${id}`)
        .then(res => res.json())
        .then(res => setData(res.data))
        .catch(err => console.error(err))
        .finally(() => setIsLoading(false));
    }
  }, [id]);

  return (
    <>
      <BasicTopBar />
      <Layout>
        <div className="bg-light premium">
          <Container className="py-4">
            {isLoading ? (
              <h4>Loading ...</h4>
            ) : (
              <>
                <Carousel
                  className="premium__carousel mb-4"
                  pause={false}
                  height="400px"
                >
                  {data.media.map(({ id, url, alt }) => (
                    <Carousel.Item key={id}>
                      <img
                        className="premium__img d-block w-100 bg-secondary"
                        src={url}
                        alt={alt}
                        loading="lazy"
                        style={{
                          objectFit: 'contain',
                        }}
                      />
                    </Carousel.Item>
                  ))}
                </Carousel>
                <Row>
                  <Col
                    lg={{
                      span: 4,
                      order: 'last',
                    }}
                  >
                    <div className="border p-4 bg-white">
                      {data.sale ? (
                        <>
                          <p className="premium__price--discount mb-0">
                            <NumberFormat
                              displayType="text"
                              value={data.price}
                              thousandSeparator
                              prefix="Rp. "
                            />
                          </p>
                          <h3 className="premium__price">
                            <NumberFormat
                              displayType="text"
                              value={data.sale}
                              thousandSeparator
                              prefix="Rp. "
                            />
                          </h3>
                        </>
                      ) : (
                        <h3 className="premium__price mb-0">
                          <NumberFormat
                            displayType="text"
                            value={data.price}
                            thousandSeparator
                            prefix="Rp. "
                          />
                        </h3>
                      )}
                      <Button className="w-100 mt-4">Pesan Sekarang</Button>

                      <hr />

                      <div className="excerpt">{data.excerpt}</div>
                    </div>
                  </Col>
                  <Col lg={8}>
                    <div className="shadow-sm p-4 my-4 my-lg-0 bg-white">
                      <h1> {data.place_name} </h1>
                      <Rating
                        readonly
                        emptySymbol={
                          <StarOutlineIcon
                            className="mr-1"
                            height="1.3rem"
                            width="1.3rem"
                          />
                        }
                        fullSymbol={
                          <StarFilledIcon
                            className="mr-1"
                            height="1.3rem"
                            width="1.3rem"
                          />
                        }
                        initialRating={data.average_rating}
                      />
                      <div className="premium__info d-sm-flex justify-content-between align-items-center mt-2">
                        <div>
                          <span className="premium__info">
                            ({data.reviews.length} Ulasan) | {data.view} kali
                            dilihat
                          </span>
                        </div>
                        <div>
                          <a href="#">+ Wishlist</a>
                        </div>
                      </div>
                      <hr />
                      <div className="premium__description">
                        <h3>Deskripsi</h3>
                        <p>{data.description}</p>
                      </div>
                    </div>
                    <Reviews data={data.reviews} />
                  </Col>
                </Row>
              </>
            )}
          </Container>
        </div>
      </Layout>
    </>
  );
}

export default Itinerary;
