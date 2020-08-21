from django.test import TestCase
from python_graphql_client import GraphqlClient
from graphene_django.utils.testing import GraphQLTestCase
from apps.schema.schema import schema
import json

# Create your tests here.

# def get_headers():
#     client = GraphqlClient(endpoint="http://localhost:8000/graphql")
#     data = client.execute(query="""
#         mutation {
#             tokenAuth(username: "amir", password: "1234") {
#                 token 
#             }
#         }
#     """)
#     return {'Content-Type': 'application/json', 'Authorization': 'JWT {}'.format(data['data']['tokenAuth']['token'])}

# class DriverTest(TestCase):

    # def test_create_driver(self):
    #     client = GraphqlClient(endpoint="http://localhost:8000/graphql")
    #     mutation = """
    #         mutation {
    #             createDriver(
    #                 driverData: {
    #                 user: {
    #                     firstName: "Mammad",
    #                     lastName: "Mammad",
    #                     email: "mmd@gmail.com",
    #                     username: "mmd",
    #                     phoneNo: "12345678", 
    #                     password: "1234"  
    #                 }
                    

    #                 nationalId: "something",
                    
    #                 }
    #             ){
    #                 driver {
    #                 user {
    #                     firstName
    #                     lastName
    #                     email
    #                     username
    #                 }
    #                 }
    #             }
    #         }
    #     """
    #     data = client.execute(query=mutation, headers=get_headers())
        # user_data = ['data']['createDriver']['driver']['user']
        # self.assertEqual(user_data['usernmae'], 'mmd')
        # self.assertEqual(user_data['firstname'], 'Mammad')
        # self.assertEqual(user_data['lastname'], 'Mammad')
        # self.assertEqual(user_data['email'], 'mmd@gmail.com')

#     def test_delete_driver(self):
#         client = GraphqlClient(endpoint="http://localhost:8000/graphql")
#         driver = Driver.objects.filter(username='mmd')[0]
#         mutation = """
#             mutation {
#                 deleteDriver(id: {}) {
#                     id
#                 }
#             }
#         """.format(driver.id)
#         client.execute(query=mutation, headers=get_headers())
#         self.assertEqual(Driver.objects.get(pk=driver.id), None)
            


class TestDriver(GraphQLTestCase):
    GRAPHQL_SCHEMA = schema
    def test_driver(self):
        print('----------------- testing create driver')
        create_driver = """
            mutation {
                createDriver(
                    driverData: {
                    user: {
                        firstName: "Mammad",
                        lastName: "Mammad",
                        email: "mmd@gmail.com",
                        username: "mmd",
                        phoneNo: "12345678", 
                        password: "1234"  
                    }
                    

                    nationalId: "something",
                    
                    }
                ){
                    driver {
                    user {
                        id
                        firstName
                        lastName
                        email
                        username
                    }
                    }
                }
            }
        """
        response = self.query(create_driver)
        print(response.content)
        content = json.loads(response.content)

        self.assertResponseNoErrors(response)
        self.assertEqual(content['usernmae'], 'mmd')
        self.assertEqual(content['firstname'], 'Mammad')
        self.assertEqual(content['lastname'], 'Mammad')
        self.assertEqual(content['email'], 'mmd@gmail.com')
        print('ok')

        print('----------------- testing get driver')