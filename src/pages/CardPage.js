import SearchInput from 'components/SearchInput';
import Page from 'components/Page';
import React, { useEffect, useState } from 'react';
import FormCreatWaste from '../components/FormCreatWaste';
import {
  Button,
  Card,
  CardBody,
  Table,
  CardHeader,
  Col,
  Row,
} from 'reactstrap';
import axios from 'axios';
import Trancsaction from '../components/Trancsaction';
const CardPage = () => {
  const [data, setData] = useState('');
  const [query, setQuery] = useState();
  const [create, setCreate] = useState(false);
  const [condition, setCondition] = useState(false);
  const [garbagetypename, setgarbagetypename] = useState();
  const [typePrice, setTypePrice] = useState();
  const pilih = dataTypewaste => {
    condition ? setCondition(true) : setCondition(true);
    setgarbagetypename(dataTypewaste.garbagetypename);
    setTypePrice(dataTypewaste.pricekilogramme);
  };

  useEffect(() => {
    axios
      .get('http://localhost:4000/typesofwaste/v1/GetAll', {
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
        withCredentials: true,
      })
      .then(response => {
        setData(response.data.data);
      })
      .catch(err => {
        console.log(err);
      });
  }, [setData]);
  if (query) {
    axios
      .get(`http://localhost:4000/typesofwaste/v1/Search?search=${query}`, {
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
        withCredentials: true,
      })
      .then(response => {
        setData(response.data.data);
      })
      .catch(err => {
        console.log(err);
      });
  }
  return (
    <Page
      title="Jenis Sampah"
      breadcrumbs={[{ name: 'Jenis Sampah', active: true }]}
    >
      <Row>
        <Col>
          <Card className="mb-3">
            <CardHeader className="d-flex justify-content-between">
              <div>Jenis Sampah</div>
              <div>
                {' '}
                <SearchInput setQuery={setQuery} />
              </div>
            </CardHeader>

            <CardBody>
              <Table size="sm">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Nama Sampah</th>
                    <th>Deskripsi</th>
                    <th>Perkilogram</th>
                    <th>activitas</th>
                  </tr>
                </thead>
                <tbody>
                  {data ? (
                    data.map((dataTypewaste, i) => {
                      return (
                        <tr key={i}>
                          <th scope="row">{i}#</th>
                          <td>{dataTypewaste.garbagetypename}</td>
                          <td>{dataTypewaste.description}</td>
                          <td>{dataTypewaste.pricekilogramme}</td>
                          <td>
                            <Button
                              color="primary"
                              className="m-1"
                              onClick={() => {
                                pilih(dataTypewaste);
                              }}
                            >
                              Kirim
                            </Button>
                            <br></br>
                          </td>
                        </tr>
                      );
                    })
                  ) : (
                    <tr>
                      <th>#</th>
                      <th>First Name</th>
                      <th>Last Name</th>
                      <th>Username</th>
                    </tr>
                  )}
                </tbody>
              </Table>
            </CardBody>
          </Card>
          {condition ? (
            <Trancsaction
              garbagetypename={garbagetypename}
              typePrice={typePrice}
            />
          ) : (
            false
          )}
          <div className="d-flex justify-content-start my-2">
            <Button
              color="success"
              onClick={() => {
                create ? setCreate(false) : setCreate(true);
              }}
            >
              Buat Sampah +{' '}
            </Button>
          </div>
        </Col>
      </Row>

      {create ? <FormCreatWaste /> : false}
    </Page>
  );
};

export default CardPage;
