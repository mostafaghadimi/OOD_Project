import {Modal} from "antd";

function info(message, content) {
  Modal.info({
    title: message,
    content: content,
    onOk() {},
  });
}

const handleError = ({graphQLErrors, networkError}) => {
    var errorMessage = "";
    if (graphQLErrors)
        graphQLErrors.map(({message, locations, path}) =>
            errorMessage += `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path} \n`
        );

    if (networkError) errorMessage = `[Network error]: ${networkError}`;
    info( "خطا به وجود امده است" , errorMessage);
};



export default (handleError);