"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[791],{70025:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>l,contentTitle:()=>c,default:()=>h,frontMatter:()=>o,metadata:()=>a,toc:()=>r});var s=n(85893),i=n(11151);const o={title:"Consensus State interface",sidebar_label:"Consensus State interface",sidebar_position:4,slug:"/ibc/light-clients/consensus-state"},c="Implementing the ConsensusState interface",a={id:"light-clients/developer-guide/consensus-state",title:"Consensus State interface",description:"A ConsensusState is the snapshot of the counterparty chain, that an IBC client uses to verify proofs (e.g. a block).",source:"@site/docs/03-light-clients/01-developer-guide/04-consensus-state.md",sourceDirName:"03-light-clients/01-developer-guide",slug:"/ibc/light-clients/consensus-state",permalink:"/main/ibc/light-clients/consensus-state",draft:!1,unlisted:!1,tags:[],version:"current",sidebarPosition:4,frontMatter:{title:"Consensus State interface",sidebar_label:"Consensus State interface",sidebar_position:4,slug:"/ibc/light-clients/consensus-state"},sidebar:"defaultSidebar",previous:{title:"Client State interface",permalink:"/main/ibc/light-clients/client-state"},next:{title:"Handling Updates and Misbehaviour",permalink:"/main/ibc/light-clients/updates-and-misbehaviour"}},l={},r=[{value:"<code>ClientType</code> method",id:"clienttype-method",level:2},{value:"<code>GetTimestamp</code> method",id:"gettimestamp-method",level:2},{value:"<code>ValidateBasic</code> method",id:"validatebasic-method",level:2}];function d(e){const t={a:"a",code:"code",h1:"h1",h2:"h2",p:"p",...(0,i.a)(),...e.components};return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsxs)(t.h1,{id:"implementing-the-consensusstate-interface",children:["Implementing the ",(0,s.jsx)(t.code,{children:"ConsensusState"})," interface"]}),"\n",(0,s.jsxs)(t.p,{children:["A ",(0,s.jsx)(t.code,{children:"ConsensusState"})," is the snapshot of the counterparty chain, that an IBC client uses to verify proofs (e.g. a block)."]}),"\n",(0,s.jsxs)(t.p,{children:["The further development of multiple types of IBC light clients and the difficulties presented by this generalization problem (see ",(0,s.jsx)(t.a,{href:"https://github.com/cosmos/ibc-go/blob/main/docs/architecture/adr-006-02-client-refactor.md",children:"ADR-006"})," for more information about this historical context) led to the design decision of each client keeping track of and set its own ",(0,s.jsx)(t.code,{children:"ClientState"})," and ",(0,s.jsx)(t.code,{children:"ConsensusState"}),", as well as the simplification of client ",(0,s.jsx)(t.code,{children:"ConsensusState"})," updates through the generalized ",(0,s.jsx)(t.code,{children:"ClientMessage"})," interface."]}),"\n",(0,s.jsxs)(t.p,{children:["The below ",(0,s.jsx)(t.a,{href:"https://github.com/cosmos/ibc-go/blob/v7.0.0/modules/core/exported/client.go#L133",children:(0,s.jsx)(t.code,{children:"ConsensusState"})})," interface is a generalized interface for the types of information a ",(0,s.jsx)(t.code,{children:"ConsensusState"})," could contain. For a reference ",(0,s.jsx)(t.code,{children:"ConsensusState"})," implementation, please see the ",(0,s.jsxs)(t.a,{href:"https://github.com/cosmos/ibc-go/blob/v7.0.0/modules/light-clients/07-tendermint/consensus_state.go",children:["Tendermint light client ",(0,s.jsx)(t.code,{children:"ConsensusState"})]}),"."]}),"\n",(0,s.jsxs)(t.h2,{id:"clienttype-method",children:[(0,s.jsx)(t.code,{children:"ClientType"})," method"]}),"\n",(0,s.jsxs)(t.p,{children:["This is the type of client consensus. It should be the same as the ",(0,s.jsx)(t.code,{children:"ClientType"})," return value for the ",(0,s.jsxs)(t.a,{href:"/main/ibc/light-clients/client-state",children:["corresponding ",(0,s.jsx)(t.code,{children:"ClientState"})," implementation"]}),"."]}),"\n",(0,s.jsxs)(t.h2,{id:"gettimestamp-method",children:[(0,s.jsx)(t.code,{children:"GetTimestamp"})," method"]}),"\n",(0,s.jsxs)(t.p,{children:[(0,s.jsx)(t.code,{children:"GetTimestamp"})," should return the timestamp (in nanoseconds) of the consensus state snapshot. This function has been deprecated and will be removed in a future release."]}),"\n",(0,s.jsxs)(t.h2,{id:"validatebasic-method",children:[(0,s.jsx)(t.code,{children:"ValidateBasic"})," method"]}),"\n",(0,s.jsxs)(t.p,{children:[(0,s.jsx)(t.code,{children:"ValidateBasic"})," should validate every consensus state field and should return an error if any value is invalid. The light client implementer is in charge of determining which checks are required."]})]})}function h(e={}){const{wrapper:t}={...(0,i.a)(),...e.components};return t?(0,s.jsx)(t,{...e,children:(0,s.jsx)(d,{...e})}):d(e)}},11151:(e,t,n)=>{n.d(t,{Z:()=>a,a:()=>c});var s=n(67294);const i={},o=s.createContext(i);function c(e){const t=s.useContext(o);return s.useMemo((function(){return"function"==typeof e?e(t):{...t,...e}}),[t,e])}function a(e){let t;return t=e.disableParentContext?"function"==typeof e.components?e.components(i):e.components||i:c(e.components),s.createElement(o.Provider,{value:t},e.children)}}}]);