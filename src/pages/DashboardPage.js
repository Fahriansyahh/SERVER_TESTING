import React, { useEffect, useState } from 'react';
import Page from 'components/Page';
import { Bar } from 'react-chartjs-2';
import axios from 'axios';
import { Card, CardBody, Table, CardHeader, Col, Row } from 'reactstrap';
import SearchInput from '../components/SearchInput';
const DashboardPage = () => {
  const [data, setData] = useState();
  const [dataUser, setDataUser] = useState();
  const [query, setQuery] = useState();
  console.log(query);
  useEffect(() => {
    axios
      .get('http://localhost:4000/transactions/v1/Chart', {
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
        withCredentials: true,
      })
      .then(response => {
        setData(response.data);
      })
      .catch(err => {
        console.log(err);
      });
    axios
      .get('http://localhost:4000/transactions/v1/GetAll', {
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
        withCredentials: true,
      })
      .then(response => {
        if (!query) {
          setDataUser(response.data.data);
        }
      })
      .catch(err => {
        console.log(err);
      });
    axios
      .get(`http://localhost:4000/transactions/v1/Search?search=${query}`)
      .then(response => {
        console.log(response);
        setDataUser(response.data.data);
      })
      .catch(err => {
        console.log(err);
      });
  }, [query, setDataUser]);

  return (
    <Page
      className="DashboardPage"
      title="Dashboard"
      breadcrumbs={[{ name: 'Dashboard', active: true }]}
    >
      <Row className="d-flex justify-content-center">
        <Col xl={10} lg={12} md={12}>
          {' '}
          <Bar data={data} />
        </Col>
      </Row>
      <Row className="d-flex justify-content-center mt-5">
        <Col xl={10} lg={12} md={12}>
          <Card className="mb-3">
            <CardHeader className="d-flex justify-content-between">
              <div>Transaksi</div>
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
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Username</th>
                  </tr>
                </thead>
                <tbody>
                  {dataUser
                    ? dataUser.map((transaction, i) => {
                        const date = new Date(transaction.transactiondate);

                        const year = date.getFullYear();
                        const month = date.getMonth() + 1; // Months are zero-based, so add 1
                        const day = date.getDate();

                        const formattedDate = `${year}-${
                          month < 10 ? '0' : ''
                        }${month}-${day < 10 ? '0' : ''}${day}`;

                        return (
                          <tr key={i}>
                            <th scope="row">{transaction.user}</th>
                            <td>{transaction.trashtypeid}</td>
                            <td>{transaction.numberkilograms}</td>
                            <td>{transaction.totalprice}</td>
                            <td>{formattedDate}</td>
                          </tr>
                        );
                      })
                    : false}
                </tbody>
              </Table>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Page>
  );
};

export default DashboardPage;
