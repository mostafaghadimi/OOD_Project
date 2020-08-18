import {ApolloConsumer, Query} from "react-apollo";
import Error from "./login";
import React from "react";
import {gql} from "@apollo/client";
import {UserType} from "../shared/user-type-enum"

const CheckUserType = ({type}) => {

    return(
        <ApolloConsumer>
            {client => (
                <Query query={ME_QUERY}>
                    {({data, loading, error}) => {
                        if (loading) return <div> is Loading </div>;
                        if (error) return <Error error={error}/>;


                        console.log(data);
                        var userType = [];
                        userType[UserType["Driver"]] = data.me.isDriver;
                        userType[UserType["Customer"]] = data.me.isCustomer;
                        userType[UserType["Authorizer"]] = data.me.isAuthorizer;

                        const key = UserType[type];
                        if (userType[key]) {
                            console.log("This is " + type.toLowerCase() + "!");
                            switch (type) {
                                case("Driver"):
                                    client.writeData({data: {"isDriverLoggedIn": true}});
                                    client.writeData({data: {"isCustomerLoggedIn": false}});
                                    client.writeData({data: {"isAuthorizerLoggedIn": false}});
                                    break;
                                case("Authorizer"):
                                    client.writeData({data: {"isDriverLoggedIn": false}});
                                    client.writeData({data: {"isCustomerLoggedIn": false}});
                                    client.writeData({data: {"isAuthorizerLoggedIn": true}});
                                    break;
                                case("Customer"):
                                    client.writeData({data: {"isDriverLoggedIn": false}});
                                    client.writeData({data: {"isCustomerLoggedIn": true}});
                                    client.writeData({data: {"isAuthorizerLoggedIn": false}});
                                    break;
                            }
                            localStorage.setItem("userType", key);

                        } else {
                            localStorage.setItem("authToken", null);
                            client.writeData({data: {"isDriverLoggedIn": false}});
                            client.writeData({data: {"isCustomerLoggedIn": false}});
                            client.writeData({data: {"isAuthorizerLoggedIn": false}});
                        }
                        console.log("FINISH");
                        return <div> </div>;
                    }}
                </Query>
            )}
        </ApolloConsumer>
    )
};

const ME_QUERY = gql`
    {
        me{
            isDriver
            isAuthorizer
            isCustomer
            isSuperuser
        }
    }
`;



export default (CheckUserType);