- [Introduction](#introduction)
- [Pre-Requisites](#pre-requisites)
- [Base solution structure](#base-solution-structure) 

# Introduction

Study Definition Repository (SDR) Reference Implementation is TransCelerate’s vision to catalyze industry-level transformation, enabling digital exchange of study definition information by collaborating with technology providers and standards bodies to create a sustainable open-source Study Definition Repository.

Using this Angular project, user can connect with SDR data, to view the study documents, search certain documents by giving search criteria, to view the audit details of search study, and also user can compare differences between two versions of the document.

This [Process Flow Document](https://github.com/transcelerate/ddf-sdr-platform/blob/main/documents/MVP%20Process%20Flows%20(final).pdf) provides information regarding user interface functions and system interactions with the SDR at a high level. Please also refer to the [DDF SDR UI User Guide](documents/ddf-sdr-user-guide-ui.pdf) to get started, and the [DDF SDR RI UI Demo video](https://www.youtube.com/watch?v=223OgGvERRw&list=PLMXS-Xt7Ou1KNUF-HQKQRRzqfPQEXWb1u&index=6).  

**NOTES:** 
- These materials and information are provided by TransCelerate Biopharma Inc. AS IS.  Any party using or relying on this information and these materials do so entirely at their own risk.  Neither TransCelerate nor its members will bear any responsibility or liability for any harm, including indirect or consequential harm, that a user may incur from use or misuse of this information or materials.
- Please be aware that any information you put into the provided tools (including the UI or API) will be visible to all users, so we recommend not using commercially sensitive or confidential information.  You and/or your employer bear all responsibility for anything you share with this project.  TransCelerate, its member companies and any vendors affiliated with the DDF project are not responsible for any harm or loss you occur as a result of uploading any information or code: commercially sensitive, confidential or otherwise.  
- As of May 2022, the DDF initiative is still the process of setting up operations, and any pull requests submitted will not be triaged at this point in time.

# Pre-requisites

1. Install latest version of [Node.js](https://nodejs.org).

2. After installing Node.js, install the Angular CLI globally in cmd prompt using the command below:

```
npm install -g @angular/cli
```
3. Validate if node and npm is installed using below commands in cmd prompt. If it has installed properly, it will show the version installed.
```
node -v
```
```
npm -v
```
4. Try repeating the installation, if there is any issue.
### How to setup code

1. Clone the repo into a local directory using below git command.

```shell
git clone "repo_url"
```
Once repo is cloned, open a terminal window and go to the project root folder using the command as mentioned below.

```shell
cd SDR%20UI/SDR-WebApp
```

2. After navigation to the root folder path as mentioned above, run `npm install` to install the required libraries.

### How To Run

1. Once code setup is done, run the project locally using the below command.

```shell
ng serve
```

2. After code is compiled successfully, open `https://localhost:4200/` in browser to run the application.

For any changes in source code, angular terminal recompiles the code and the browser will reload the application.

3. Use the below commands to commit and push the changes to repo. 

```shell
git commit -m 'message for commit'
git push
```

# Base solution structure

The solution has the following structure:

```
  .
  ├── src
      ├── app
      │   ├── core
      │   ├── features
      │   └── shared
      ├── environments
      │   ├── environment.ts
      ├── styles

```
**core** - contains files related to core angular structure - app.component.ts, app.module.ts, app-routing.module.ts.

**features** - contains application feature modules - dashboard,login,search-study.

**shared** - contains application shared modules - audit-trail, breadcrumb, error-component, footer, header, menu, modal-component, study-element-description, version-comparison.

**environment.ts** - contains files to configure service URLs and other environment specific secrets.

**styles** - contains common CSS stylesheets.


### Making requests to the backend API

API URL and other secrets are configured in `src/environments/environment.ts` file as shown below, the values of the keys will be replaced 
with the environment specific values from devops during deployment.

```
export const environment = {
  production: true,

  tenantId: '#{AzureAd-TenantId}#',
  authority: `#{AzureAd-Authority}#`, 
  clientId: '#{AzureAd-ClientId}#', 
  Audiance: '#{AzureAd-Audiance}#',

  redirectUrl: '#{AzureAd-RedirectUrl}#',
  loginUrl: '#{AzureAd-LoginUrl}#',

  BASE_URL:'#{Apim-BaseUrl}#',
};
```

To run locally, create `environment.development.ts` file under environments folder, and replace the values of the keys with values of the target environment.

And this file is not committed, as it is ignored in `.gitignore` file.
 
### Certificate Installation for APIM
1. Get the environment specific client certificates from Cloud administrator and install on the local system.

2. While accessing homepage, certificate selection prompt will be shown. Select the relevant certificate from the list to proceed further and access data.

**Application Authentication :**
- The application uses  Microsoft Authentication Library (MSAL) for user authentication.
- Users with valid credentials (registered in cloud active directory) can login to the application.
- For MSAL integration, the secrets should be configured in environment file as mentioned in the above section.

**Application Features:**
- After successful login, user will be navigated to home screen 
- Home screen will have *Recent activity widget*, showing list of study documents updated in last 30 days.
- On click of Search menu, user will be navigated to *Search page* to search specific study documents based on certain study parameters.
- On click of any Study document, user will be navigated to *Study details page*.
- From Study details page, user  can click  "View History / Audit Trail" to view the complete audit trail data for the study document
- In *Audit trail page*, user  can select any two versions and click on "Version Comparison" to compare the changes.
- User will be logged out from application on click of logout link in the header.

**URL List**

- Default page (URL: /# )
  - Has login link
  - Uses MSAL oauth authentication (store the token in localStorage)
- Home page (URL: /home )
  - Dashboard page with recent activity widget and Menu bar to navigate to search
- Search page (URL: /search )
- Study Details page(URL: /#/details;studyId="")
- Audit page(URL: /#/details/audit;studyId="")
- Version Comparison page(URL: /#/details/audit/compare;studyId="";versionA="";versionB="")
