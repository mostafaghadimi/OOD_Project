from django.test import TestCase
from python_graphql_client import GraphqlClient

# Create your tests here.

def get_headers():
    client = GraphqlClient(endpoint="http://localhost:8000/graphql")
    data = client.execute(query="""
        mutation {
            tokenAuth(username: "amir", password: "1234") {
                token 
            }
        }
    """)
    return {'Content-Type': 'application/json', 'Authorization': 'JWT {}'.format(data['data']['tokenAuth']['token'])}

class UsersTest(TestCase):

    def test_driver(self):
        client = GraphqlClient(endpoint="http://localhost:8000/graphql")
        headers = get_headers()
        print('----------------- create drivers')
        create_driver = """
            mutation {{
                createDriver(
                    driverData: {{
                    user: {{
                        firstName: "{firstName}",
                        lastName: "{lastName}",
                        email: "{email}",
                        username: "{username}",
                        phoneNo: "{phoneNo}", 
                        password: "{password}"  
                    }}
                    

                    nationalId: "{nationalId}",
                    
                    }}
                ){{
                    driver {{
                    user {{
                        id
                        firstName
                        lastName
                        email
                        username
                    }}
                    }}
                }}
            }}
        """
        drivers = [
            {
                'firstName': 'Mammad',
                'lastName': 'Mammadi',
                'email': 'mmd@gmail.com',
                'username': 'mmd',
                'phoneNo': '12345678',
                'password': '1234',
                'nationalId': 'something'
            },
            {
                'firstName': 'Akbar',
                'lastName': 'Ghayouri',
                'email': 'akbar@gmail.com',
                'username': 'akbar',
                'phoneNo': '87654321',
                'password': '1234',
                'nationalId': 'somethingelse'
            }
        ]
        for driver in drivers:
            data = client.execute(query=create_driver.format(**driver), headers=headers)
            user_data = data['data']['createDriver']['driver']['user']
            self.assertEqual(user_data['username'], driver['username'])
            self.assertEqual(user_data['firstName'], driver['firstName'])
            self.assertEqual(user_data['lastName'], driver['lastName'])
            self.assertEqual(user_data['email'], driver['email'])
            driver['id'] = user_data['id']

        print('----------------- get all drivers')
        get_drivers = """
            {
                allDrivers {
                    id
                    user {
                    id
                    }
                    
                }
                }
        """
        data = client.execute(query=get_drivers, headers=headers)
        for driver in drivers:
            created = False
            for d in data['data']['allDrivers']:
                if d['id'] == driver['id']:
                    self.assertEqual(d['id'], d['user']['id'])
                    created = True
                    break
            self.assertEqual(created, True)
        
        print('----------------- get driver')
        get_driver = """
            {{
                driver(id: {}) {{
                    user {{
                    firstName
                    lastName
                    email
                    phoneNo
                    username
                    }}
                }}
            }}
        """.format(drivers[0]['id'])
        data = client.execute(query=get_driver, headers=headers)
        user_data = data['data']['driver']['user']
        driver = drivers[0]
        self.assertEqual(user_data['username'], driver['username'])
        self.assertEqual(user_data['firstName'], driver['firstName'])
        self.assertEqual(user_data['lastName'], driver['lastName'])
        self.assertEqual(user_data['email'], driver['email'])
        self.assertEqual(user_data['phoneNo'], driver['phoneNo'])

        print('----------------- update driver')
        updated_driver = {
            'id': drivers[1]['id'],
            'firstName': "Ali Akbar",
            'lastName': "Ghayouri",
            'email': "ghayoori@gmail.com",
            'username': "AliGhayoori",
            'phoneNo': "0912****175",
            'password': "asdf",
            'nationalId': "00123103"
        }
        update_driver = """
            mutation {{
                updateDriver(
                    id: {id},
                    driverData: {{
                    user: {{
                        firstName: "{firstName}",
                        lastName: "{lastName}",
                        email: "{email}",
                        username: "{username}",
                        phoneNo: "{phoneNo}",
                        password: "{password}"
                    }},
                    nationalId: "{nationalId}",
                    
                    }},
                ){{
                    driver {{
                    user {{
                        firstName
                        lastName
                        email
                        username
                        phoneNo
                    }}
                    }}
                }}
            }}
        """.format(**updated_driver)
        data = client.execute(query=update_driver, headers=headers)
        user_data = data['data']['updateDriver']['driver']['user']
        self.assertEqual(user_data['username'], updated_driver['username'])
        self.assertEqual(user_data['firstName'], updated_driver['firstName'])
        self.assertEqual(user_data['lastName'], updated_driver['lastName'])
        self.assertEqual(user_data['email'], updated_driver['email'])
        self.assertEqual(user_data['phoneNo'], updated_driver['phoneNo'])
        drivers[1] = updated_driver

        print('----------------- verify driver')
        verify_driver = """
            mutation {{
                verifyDriver(id:{}){{
                    driver{{
                        isVerified
                    }}
                }}
            }}
        """.format(drivers[0]['id'])
        data = client.execute(query=verify_driver, headers=headers)
        self.assertEqual(data['data']['verifyDriver']['driver']['isVerified'], True)

        print('----------------- delete drivers')
        delete_driver = """
            mutation {{
            deleteDriver(id: {}) {{
                id
            }}
        }}
        """
        for driver in drivers:
            client.execute(query=delete_driver.format(driver['id']), headers=headers)
        
