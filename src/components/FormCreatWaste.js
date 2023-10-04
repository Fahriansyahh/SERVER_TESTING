import React, { useState } from 'react';
import axios from 'axios';
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Form,
  FormGroup,
  Input,
  Label,
  Row,
} from 'reactstrap';
const FormCreatWaste = () => {
  const [garbagetypename, setGarbagetypename] = useState();
  const [description, setDescriptions] = useState();
  const [pricekilogramme, setPricekilogramme] = useState();
  const [data, setData] = useState();
  const Create = () => {
    const data = { garbagetypename, description, pricekilogramme };
    axios
      .post('http://localhost:4000/typesofwaste/v1/Create', data, {
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
        withCredentials: true,
      })
      .then(response => {
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
          <CardHeader>Buat Sampah</CardHeader>
          <CardBody>
            <Form>
              <FormGroup>
                <Label for="exampleEmail">Tipe Sampah</Label>
                <Input
                  type="text"
                  name="Tipe Sampah"
                  placeholder="nama Sampah"
                  onChange={a => {
                    setGarbagetypename(a.target.value);
                  }}
                />
              </FormGroup>
              <FormGroup>
                <Label for="exampleEmail">description</Label>
                <Input
                  type="text"
                  name="description"
                  placeholder="description"
                  onChange={a => {
                    setDescriptions(a.target.value);
                  }}
                />
              </FormGroup>
              <FormGroup>
                <Label for="perkilogram">Perkilogram</Label>
                <Input
                  type="number"
                  name="perkilogram"
                  placeholder="password placeholder"
                  onChange={a => {
                    setPricekilogramme(a.target.value);
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

export default FormCreatWaste;
