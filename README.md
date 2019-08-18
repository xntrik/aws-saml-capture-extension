# AWS SAML Capture

This is a very small Chrome Extension designed to capture the SAMLResponse that is passed from an IdP to the AWS SAML Federated SSO login endpoint. You can read more about Federated SAML 2.0 SSO with AWS [here](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles_providers_saml.html).

The idea of this extension is to facilitate capturing the SAMLResponse that is POSTed from a separate IdP into AWS, and then allowing it to be used with <blah> to login via the CLI. Many IdPs provide API-based access such that you can easily setup AWS CLI access programmatically. Unfortunately, if you rely on Azure Active Directory or ADFS, you can't. 

A great solution to this problem is Dave Johnson's [aws-azure-login](https://github.com/dtjohnson/aws-azure-login), but this requires node and also spins up a headless browser. (not that there's anything wrong with that).

## Usage

By default the extension does nothing. If you click it, the icon should change and the extension is activated. Then if you proceed to login to AWS through a separate IdP, you should receive a message saying "SAML Response copied to clipboard". And the base64 blob will be in your clipboard.

To disable the extension, just click it again, and the icon should change back to the disabled state

## Thanks

Icons made by [Freepik](https://www.flaticon.com/authors/freepik) from [www.flaticon.com](https://www.flaticon.com/) and is licensed [CC 3.0 BY](http://creativecommons.org/licenses/by/3.0/)

[Dave Johnson](https://github.com/dtjohnson)
