"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[1154],{20874:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>r,contentTitle:()=>o,default:()=>h,frontMatter:()=>a,metadata:()=>c,toc:()=>l});var i=n(85893),s=n(11151);const a={},o="ADR 006: ICS-02 client refactor",c={id:"adr-006-02-client-refactor",title:"ADR 006: ICS-02 client refactor",description:"Changelog",source:"@site/architecture/adr-006-02-client-refactor.md",sourceDirName:".",slug:"/adr-006-02-client-refactor",permalink:"/architecture/adr-006-02-client-refactor",draft:!1,unlisted:!1,tags:[],version:"current",frontMatter:{},sidebar:"defaultSidebar",previous:{title:"ADR 005: UpdateClient Events - ClientState Consensus Heights",permalink:"/architecture/adr-005-consensus-height-events"},next:{title:"ADR 007: Solo machine sign bytes",permalink:"/architecture/adr-007-solomachine-signbytes"}},r={},l=[{value:"Changelog",id:"changelog",level:2},{value:"Status",id:"status",level:2},{value:"Context",id:"context",level:2},{value:"Tendermint non-zero height upgrades",id:"tendermint-non-zero-height-upgrades",level:3},{value:"Tendermint requires misbehaviour detection during updates",id:"tendermint-requires-misbehaviour-detection-during-updates",level:3},{value:"Localhost requires access to the entire client store",id:"localhost-requires-access-to-the-entire-client-store",level:3},{value:"Solomachine doesn&#39;t set consensus states",id:"solomachine-doesnt-set-consensus-states",level:3},{value:"New clients may want to do batch updates",id:"new-clients-may-want-to-do-batch-updates",level:3},{value:"Decision",id:"decision",level:2},{value:"Require light clients to set client and consensus states",id:"require-light-clients-to-set-client-and-consensus-states",level:3},{value:"Merge <code>Header</code>/<code>Misbehaviour</code> interface and rename to <code>ClientMessage</code>",id:"merge-headermisbehaviour-interface-and-rename-to-clientmessage",level:3},{value:"Split <code>CheckHeaderAndUpdateState</code> into 4 functions",id:"split-checkheaderandupdatestate-into-4-functions",level:3},{value:"Add <code>GetTimestampAtHeight</code> to the client state interface",id:"add-gettimestampatheight-to-the-client-state-interface",level:3},{value:"Add generic verification functions",id:"add-generic-verification-functions",level:3},{value:"Consequences",id:"consequences",level:2},{value:"Positive",id:"positive",level:3},{value:"Negative",id:"negative",level:3},{value:"Neutral",id:"neutral",level:3},{value:"References",id:"references",level:2}];function d(e){const t={a:"a",blockquote:"blockquote",code:"code",h1:"h1",h2:"h2",h3:"h3",li:"li",p:"p",pre:"pre",ul:"ul",...(0,s.a)(),...e.components};return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(t.h1,{id:"adr-006-ics-02-client-refactor",children:"ADR 006: ICS-02 client refactor"}),"\n",(0,i.jsx)(t.h2,{id:"changelog",children:"Changelog"}),"\n",(0,i.jsxs)(t.ul,{children:["\n",(0,i.jsx)(t.li,{children:"2022-08-01: Initial Draft"}),"\n"]}),"\n",(0,i.jsx)(t.h2,{id:"status",children:"Status"}),"\n",(0,i.jsx)(t.p,{children:"Accepted and applied in v7 of ibc-go"}),"\n",(0,i.jsx)(t.h2,{id:"context",children:"Context"}),"\n",(0,i.jsxs)(t.p,{children:["During the initial development of the 02-client submodule, each light client supported (06-solomachine, 07-tendermint, 09-localhost) was referenced through hardcoding.\nHere is an example of the ",(0,i.jsx)(t.a,{href:"https://github.com/cosmos/cosmos-sdk/commit/b93300288e3a04faef9c0774b75c13b24450ba1c#diff-c5f6b956947375f28d611f18d0e670cf28f8f305300a89c5a9b239b0eeec5064R83",children:"code"})," that existed in the 02-client submodule:"]}),"\n",(0,i.jsx)(t.pre,{children:(0,i.jsx)(t.code,{className:"language-go",children:"func (k Keeper) UpdateClient(ctx sdk.Context, clientID string, header exported.Header) (exported.ClientState, error) {\n  ...\n\n  switch clientType {\n  case exported.Tendermint:\n    clientState, consensusState, err = tendermint.CheckValidityAndUpdateState(\n    clientState, header, ctx.BlockTime(),\n    )\n  case exported.Localhost:\n    // override client state and update the block height\n    clientState = localhosttypes.NewClientState(\n    ctx.ChainID(), // use the chain ID from context since the client is from the running chain (i.e self).\n    ctx.BlockHeight(),\n    )\n  default:\n    err = types.ErrInvalidClientType\n  }\n"})}),"\n",(0,i.jsxs)(t.p,{children:["To add additional light clients, code would need to be added directly to the 02-client submodule.\nEvidently, this would likely become problematic as IBC scaled to many chains using consensus mechanisms beyond the initial supported light clients.\nIssue ",(0,i.jsx)(t.a,{href:"https://github.com/cosmos/cosmos-sdk/issues/6064",children:"#6064"})," on the SDK addressed this problem by creating a more modular 02-client submodule.\nThe 02-client submodule would now interact with each light client via an interface.\nWhile, this change was positive in development, increasing the flexibility and adoptability of IBC, it also opened the door to new problems."]}),"\n",(0,i.jsx)(t.p,{children:"The difficulty of generalizing light clients became apparent once changes to those light clients were required.\nEach light client represents a different consensus algorithm which may contain a host of complexity and nuances.\nHere are some examples of issues which arose for light clients that are not applicable to all the light clients supported (06-solomachine, 07-tendermint, 09-localhost):"}),"\n",(0,i.jsx)(t.h3,{id:"tendermint-non-zero-height-upgrades",children:"Tendermint non-zero height upgrades"}),"\n",(0,i.jsxs)(t.p,{children:["Before the launch of IBC, it was determined that the golang implementation of ",(0,i.jsx)(t.a,{href:"https://github.com/tendermint/tendermint",children:"tendermint"})," would not be capable of supporting non-zero height upgrades.\nThis implies that any upgrade would require changing of the chain ID and resetting the height to 0.\nA chain is uniquely identified by its chain-id and validator set.\nTwo different chain ID's can be viewed as different chains and thus a normal update produced by a validator set cannot change the chain ID.\nTo work around the lack of support for non-zero height upgrades, an abstract height type was created along with an upgrade mechanism.\nThis type would indicate the revision number (the number of times the chain ID has been changed) and revision height (the current height of the blockchain)."]}),"\n",(0,i.jsx)(t.p,{children:"Refs:"}),"\n",(0,i.jsxs)(t.ul,{children:["\n",(0,i.jsxs)(t.li,{children:["Issue ",(0,i.jsx)(t.a,{href:"https://github.com/cosmos/ibc/issues/439",children:"#439"})," on IBC specification repository."]}),"\n",(0,i.jsxs)(t.li,{children:["Specification changes in ",(0,i.jsx)(t.a,{href:"https://github.com/cosmos/ibc/pull/447",children:"#447"})]}),"\n",(0,i.jsxs)(t.li,{children:["Implementation changes for the abstract height type, ",(0,i.jsx)(t.a,{href:"https://github.com/cosmos/cosmos-sdk/pull/7211",children:"SDK#7211"})]}),"\n"]}),"\n",(0,i.jsx)(t.h3,{id:"tendermint-requires-misbehaviour-detection-during-updates",children:"Tendermint requires misbehaviour detection during updates"}),"\n",(0,i.jsxs)(t.p,{children:["The initial release of the IBC module and the 07-tendermint light client implementation did not support misbehaviour detection during update nor did it prevent overwriting of previous updates.\nDespite the fact that we designed the ",(0,i.jsx)(t.code,{children:"ClientState"})," interface and developed the 07-tendermint client, we failed to detect even a duplicate update that constituted misbehaviour and thus should freeze the client.\nThis was fixed in PR ",(0,i.jsx)(t.a,{href:"https://github.com/cosmos/ibc-go/pull/141",children:"#141"})," which required light client implementations to be aware that they must handle duplicate updates and misbehaviour detection.\nMisbehaviour detection during updates is not applicable to the solomachine nor localhost.\nIt is also not obvious that ",(0,i.jsx)(t.code,{children:"CheckHeaderAndUpdateState"})," should be performing this functionality."]}),"\n",(0,i.jsx)(t.h3,{id:"localhost-requires-access-to-the-entire-client-store",children:"Localhost requires access to the entire client store"}),"\n",(0,i.jsxs)(t.p,{children:["The localhost has been broken since the initial version of the IBC module.\nThe localhost tried to be developed underneath the 02-client interfaces without special exception, but this proved to be impossible.\nThe issues were outlined in ",(0,i.jsx)(t.a,{href:"https://github.com/cosmos/ibc-go/issues/27",children:"#27"})," and further discussed in the attempted ADR in ",(0,i.jsx)(t.a,{href:"https://github.com/cosmos/ibc-go/pull/75",children:"#75"}),".\nUnlike all other clients, the localhost requires access to the entire IBC store and not just the prefixed client store."]}),"\n",(0,i.jsx)(t.h3,{id:"solomachine-doesnt-set-consensus-states",children:"Solomachine doesn't set consensus states"}),"\n",(0,i.jsxs)(t.p,{children:["The 06-solomachine does not set the consensus states within the prefixed client store.\nIt has a single consensus state that is stored within the client state.\nThis causes setting of the consensus state at the 02-client level to use unnecessary storage.\nIt also causes timeouts to fail with solo machines.\nPreviously, the timeout logic within IBC would obtain the consensus state at the height a timeout is being proved.\nThis is problematic for the solo machine as no consensus state is set.\nSee issue ",(0,i.jsx)(t.a,{href:"https://github.com/cosmos/ibc/issues/562",children:"#562"})," on the IBC specification repo."]}),"\n",(0,i.jsx)(t.h3,{id:"new-clients-may-want-to-do-batch-updates",children:"New clients may want to do batch updates"}),"\n",(0,i.jsxs)(t.p,{children:["New light clients may not function in a similar fashion to 06-solomachine and 07-tendermint.\nThey may require setting many consensus states in a single update.\nAs @seunlanlege ",(0,i.jsx)(t.a,{href:"https://github.com/cosmos/ibc-go/issues/284#issuecomment-1005583679",children:"states"}),":"]}),"\n",(0,i.jsxs)(t.blockquote,{children:["\n",(0,i.jsx)(t.p,{children:"I'm in support of these changes for 2 reasons:"}),"\n",(0,i.jsxs)(t.ul,{children:["\n",(0,i.jsxs)(t.li,{children:["\n",(0,i.jsx)(t.p,{children:"This would allow light clients to handle batch header updates in CheckHeaderAndUpdateState, for the special case of 11-beefy proving the finality for a batch of headers is much more space and time efficient than the space/time complexity of proving each individual headers in that batch, combined."}),"\n"]}),"\n",(0,i.jsxs)(t.li,{children:["\n",(0,i.jsx)(t.p,{children:"This also allows for a single light client instance of 11-beefy be used to prove finality for every parachain connected to the relay chain (Polkadot/Kusama). We achieve this by setting the appropriate ConsensusState for individual parachain headers in CheckHeaderAndUpdateState"}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,i.jsx)(t.h2,{id:"decision",children:"Decision"}),"\n",(0,i.jsx)(t.h3,{id:"require-light-clients-to-set-client-and-consensus-states",children:"Require light clients to set client and consensus states"}),"\n",(0,i.jsx)(t.p,{children:"The IBC specification states:"}),"\n",(0,i.jsxs)(t.blockquote,{children:["\n",(0,i.jsx)(t.p,{children:"If the provided header was valid, the client MUST also mutate internal state to store now-finalised consensus roots and update any necessary signature authority tracking (e.g. changes to the validator set) for future calls to the validity predicate."}),"\n"]}),"\n",(0,i.jsx)(t.p,{children:'The initial version of the IBC go SDK based module did not fulfill this requirement.\nInstead, the 02-client submodule required each light client to return the client and consensus state which should be updated in the client prefixed store.\nThis decision lead to the issues "Solomachine doesn\'t set consensus states" and "New clients may want to do batch updates".'}),"\n",(0,i.jsx)(t.p,{children:"Each light client should be required to set its own client and consensus states on any update necessary.\nThe go implementation should be changed to match the specification requirements.\nThis will allow more flexibility for light clients to manage their own internal storage and do batch updates."}),"\n",(0,i.jsxs)(t.h3,{id:"merge-headermisbehaviour-interface-and-rename-to-clientmessage",children:["Merge ",(0,i.jsx)(t.code,{children:"Header"}),"/",(0,i.jsx)(t.code,{children:"Misbehaviour"})," interface and rename to ",(0,i.jsx)(t.code,{children:"ClientMessage"})]}),"\n",(0,i.jsxs)(t.p,{children:["Remove ",(0,i.jsx)(t.code,{children:"GetHeight()"})," from the header interface (as light clients now set the client/consensus states).\nThis results in the ",(0,i.jsx)(t.code,{children:"Header"}),"/",(0,i.jsx)(t.code,{children:"Misbehaviour"})," interfaces being the same.\nTo reduce complexity of the codebase, the ",(0,i.jsx)(t.code,{children:"Header"}),"/",(0,i.jsx)(t.code,{children:"Misbehaviour"})," interfaces should be merged into ",(0,i.jsx)(t.code,{children:"ClientMessage"}),".\n",(0,i.jsx)(t.code,{children:"ClientMessage"})," will provide the client with some authenticated information which may result in regular updates, misbehaviour detection, batch updates, or other custom functionality a light client requires."]}),"\n",(0,i.jsxs)(t.h3,{id:"split-checkheaderandupdatestate-into-4-functions",children:["Split ",(0,i.jsx)(t.code,{children:"CheckHeaderAndUpdateState"})," into 4 functions"]}),"\n",(0,i.jsxs)(t.p,{children:["See ",(0,i.jsx)(t.a,{href:"https://github.com/cosmos/ibc-go/issues/668",children:"#668"}),"."]}),"\n",(0,i.jsxs)(t.p,{children:["Split ",(0,i.jsx)(t.code,{children:"CheckHeaderAndUpdateState"})," into 4 functions:"]}),"\n",(0,i.jsxs)(t.ul,{children:["\n",(0,i.jsx)(t.li,{children:(0,i.jsx)(t.code,{children:"VerifyClientMessage"})}),"\n",(0,i.jsx)(t.li,{children:(0,i.jsx)(t.code,{children:"CheckForMisbehaviour"})}),"\n",(0,i.jsx)(t.li,{children:(0,i.jsx)(t.code,{children:"UpdateStateOnMisbehaviour"})}),"\n",(0,i.jsx)(t.li,{children:(0,i.jsx)(t.code,{children:"UpdateState"})}),"\n"]}),"\n",(0,i.jsxs)(t.p,{children:[(0,i.jsx)(t.code,{children:"VerifyClientMessage"})," checks the that the structure of a ",(0,i.jsx)(t.code,{children:"ClientMessage"})," is correct and that all authentication data provided is valid."]}),"\n",(0,i.jsxs)(t.p,{children:[(0,i.jsx)(t.code,{children:"CheckForMisbehaviour"})," checks to see if a ",(0,i.jsx)(t.code,{children:"ClientMessage"})," is evidence of misbehaviour."]}),"\n",(0,i.jsxs)(t.p,{children:[(0,i.jsx)(t.code,{children:"UpdateStateOnMisbehaviour"})," freezes the client and updates its state accordingly."]}),"\n",(0,i.jsxs)(t.p,{children:[(0,i.jsx)(t.code,{children:"UpdateState"})," performs a regular update or a no-op on duplicate updates."]}),"\n",(0,i.jsx)(t.p,{children:"The code roughly looks like:"}),"\n",(0,i.jsx)(t.pre,{children:(0,i.jsx)(t.code,{className:"language-go",children:"func (k Keeper) UpdateClient(ctx sdk.Context, clientID string, header exported.Header) error {\n  ...\n\n  if err := clientState.VerifyClientMessage(clientMessage); err != nil {\n    return err\n  }\n  \n  foundMisbehaviour := clientState.CheckForMisbehaviour(clientMessage)\n  if foundMisbehaviour {\n    clientState.UpdateStateOnMisbehaviour(header)\n    // emit misbehaviour event\n    return \n  }\n  \n  clientState.UpdateState(clientMessage) // expects no-op on duplicate header\n  // emit update event\n  return\n}\n"})}),"\n",(0,i.jsxs)(t.h3,{id:"add-gettimestampatheight-to-the-client-state-interface",children:["Add ",(0,i.jsx)(t.code,{children:"GetTimestampAtHeight"})," to the client state interface"]}),"\n",(0,i.jsxs)(t.p,{children:["By adding ",(0,i.jsx)(t.code,{children:"GetTimestampAtHeight"})," to the ClientState interface, we allow light clients which do non-traditional consensus state/timestamp storage to process timeouts correctly.\nThis fixes the issues outlined for the solo machine client."]}),"\n",(0,i.jsx)(t.h3,{id:"add-generic-verification-functions",children:"Add generic verification functions"}),"\n",(0,i.jsxs)(t.p,{children:["As the complexity and the functionality grows, new verification functions will be required for additional paths.\nThis was explained in ",(0,i.jsx)(t.a,{href:"https://github.com/cosmos/ibc/issues/684",children:"#684"})," on the specification repo.\nThese generic verification functions would be immediately useful for the new paths added in connection/channel upgradability as well as for custom paths defined by IBC applications such as Interchain Queries.\nThe old verification functions (",(0,i.jsx)(t.code,{children:"VerifyClientState"}),", ",(0,i.jsx)(t.code,{children:"VerifyConnection"}),", etc) should be removed in favor of the generic verification functions."]}),"\n",(0,i.jsx)(t.h2,{id:"consequences",children:"Consequences"}),"\n",(0,i.jsx)(t.h3,{id:"positive",children:"Positive"}),"\n",(0,i.jsxs)(t.ul,{children:["\n",(0,i.jsx)(t.li,{children:"Flexibility for light client implementations"}),"\n",(0,i.jsx)(t.li,{children:"Well defined interfaces and their required functionality"}),"\n",(0,i.jsx)(t.li,{children:"Generic verification functions"}),"\n",(0,i.jsx)(t.li,{children:"Applies changes necessary for future client/connection/channel upgrabability features"}),"\n",(0,i.jsx)(t.li,{children:"Timeout processing for solo machines"}),"\n",(0,i.jsx)(t.li,{children:"Reduced code complexity"}),"\n"]}),"\n",(0,i.jsx)(t.h3,{id:"negative",children:"Negative"}),"\n",(0,i.jsxs)(t.ul,{children:["\n",(0,i.jsx)(t.li,{children:"The refactor touches on sensitive areas of the ibc-go codebase"}),"\n",(0,i.jsxs)(t.li,{children:["Changing of established naming (",(0,i.jsx)(t.code,{children:"Header"}),"/",(0,i.jsx)(t.code,{children:"Misbehaviour"})," to ",(0,i.jsx)(t.code,{children:"ClientMessage"}),")"]}),"\n"]}),"\n",(0,i.jsx)(t.h3,{id:"neutral",children:"Neutral"}),"\n",(0,i.jsx)(t.p,{children:"No notable consequences"}),"\n",(0,i.jsx)(t.h2,{id:"references",children:"References"}),"\n",(0,i.jsx)(t.p,{children:"Issues:"}),"\n",(0,i.jsxs)(t.ul,{children:["\n",(0,i.jsx)(t.li,{children:(0,i.jsx)(t.a,{href:"https://github.com/cosmos/ibc-go/issues/284",children:"#284"})}),"\n"]}),"\n",(0,i.jsx)(t.p,{children:"PRs:"}),"\n",(0,i.jsxs)(t.ul,{children:["\n",(0,i.jsx)(t.li,{children:(0,i.jsx)(t.a,{href:"https://github.com/cosmos/ibc-go/pull/1871",children:"#1871"})}),"\n"]})]})}function h(e={}){const{wrapper:t}={...(0,s.a)(),...e.components};return t?(0,i.jsx)(t,{...e,children:(0,i.jsx)(d,{...e})}):d(e)}},11151:(e,t,n)=>{n.d(t,{Z:()=>c,a:()=>o});var i=n(67294);const s={},a=i.createContext(s);function o(e){const t=i.useContext(a);return i.useMemo((function(){return"function"==typeof e?e(t):{...t,...e}}),[t,e])}function c(e){let t;return t=e.disableParentContext?"function"==typeof e.components?e.components(s):e.components||s:o(e.components),i.createElement(a.Provider,{value:t},e.children)}}}]);