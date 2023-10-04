import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Row,
  Form,
  FormGroup,
  Input,
  Label,
} from 'reactstrap';
const Trancsaction = ({ garbagetypename, typePrice }) => {
  const [kilogram, setKilogram] = useState();
  const [price, setPrice] = useState();
  const [data, setData] = useState();
  console.log(garbagetypename);
  console.log(typePrice);
  useEffect(() => {
    if (kilogram) {
      setPrice(typePrice * kilogram);
    }
  }, [kilogram, typePrice, setPrice]);

  const formatRupiah = number => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
    }).format(number);
  };
  const Create = () => {
    const user = localStorage.getItem('user');
    console.log(user);
    console.log(garbagetypename);
    console.log(kilogram);
    axios
      .post(
        `http://localhost:4000/transactions/v1/Create?userId=${user}&wasteId=${garbagetypename}&number=${kilogram}`,
      )
      .then(response => {
        console.log(response);
        setData(response);
      })
      .catch(err => {
        console.log(err);
      });
  };
  console.log(data);
  return (
    <Row>
      <Col xl={8} lg={12} md={12}>
        <Card>
          <CardHeader>Kirim Sampah</CardHeader>
          <CardBody>
            <Form>
              <FormGroup>
                <Label for="exampleKilogram">Harga</Label>
                <Input type="number" defaultValue={typePrice} disabled />
              </FormGroup>
              <FormGroup>
                <Label for="exampleTotal">Total</Label>
                <Input
                  type="text"
                  name="Tipe Sampah"
                  value={formatRupiah(price) || '0'}
                  placeholder="0"
                  disabled
                />
              </FormGroup>
              <FormGroup>
                <Label for="exampleKilogram">kilogram</Label>
                <Input
                  type="number"
                  name="Tipe Sampah"
                  placeholder="kg"
                  onChange={a => {
                    setKilogram(parseInt(a.target.value));
                  }}
                />
              </FormGroup>
            </Form>
            <div className="d-flex justify-content-end">
              <Button color="success" className="m-1" onClick={() => Create()}>
                Buat
              </Button>
            </div>
          </CardBody>
        </Card>
      </Col>
    </Row>
  );
};

export default Trancsaction;
