/**
 * @generated SignedSource<<bebdfc6812f2974c11e4bdea5bc9ac90>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
export type ApplicationListQuery$variables = {
  user_id: string;
};
export type ApplicationListQuery$data = {
  readonly applicationsByUserID: ReadonlyArray<{
    readonly id: string;
    readonly title: string;
  } | null> | null;
};
export type ApplicationListQuery = {
  response: ApplicationListQuery$data;
  variables: ApplicationListQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "user_id"
  }
],
v1 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "user_id",
        "variableName": "user_id"
      }
    ],
    "concreteType": "Application",
    "kind": "LinkedField",
    "name": "applicationsByUserID",
    "plural": true,
    "selections": [
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "id",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "title",
        "storageKey": null
      }
    ],
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "ApplicationListQuery",
    "selections": (v1/*: any*/),
    "type": "RootQuery",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "ApplicationListQuery",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "827882d811290aca8023d75c741c5fea",
    "id": null,
    "metadata": {},
    "name": "ApplicationListQuery",
    "operationKind": "query",
    "text": "query ApplicationListQuery(\n  $user_id: ID!\n) {\n  applicationsByUserID(user_id: $user_id) {\n    id\n    title\n  }\n}\n"
  }
};
})();

(node as any).hash = "9d70a9bc816f7761a4fafa364c636be9";

export default node;
