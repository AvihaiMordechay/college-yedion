import{a9 as l,w as H,Y as A,E as q,e as d,j as e,G as t,Z as v,J as h,x as i,H as j,T as a,U as S,$ as p,a0 as k,a1 as I,a2 as g,a3 as N,a4 as V,a6 as _,a7 as w,a8 as O,a5 as U}from"./index-U8xhMif2.js";import{G as Z,F as J,c as Q,a as R,d as Y,b as K,C as X,A as ee,e as te,f as re}from"./AuthFooter-D-F9wa5h.js";const se=r=>new RegExp(/[0-9]/).test(r),ne=r=>new RegExp(/[a-z]/).test(r)&&new RegExp(/[A-Z]/).test(r),ie=r=>new RegExp(/[!#@$%^&*)(+=._-]/).test(r),ae=r=>r<2?{label:"Poor",color:l.errorMain}:r<3?{label:"Weak",color:l.warningDark}:r<4?{label:"Normal",color:l.orangeMain}:r<5?{label:"Good",color:l.successMain}:r<6?{label:"Strong",color:l.successDark}:{label:"Poor",color:l.errorMain},oe=r=>{let s=0;return r.length>5&&(s+=1),r.length>7&&(s+=1),se(r)&&(s+=1),ie(r)&&(s+=1),ne(r)&&(s+=1),s},le=({...r})=>{const s=H(),f=A(s.breakpoints.down("md")),E=q(n=>n.customization),[m,P]=d.useState(!1),[F,M]=d.useState(!0),[W,z]=d.useState(0),[o,D]=d.useState(),B=async()=>{console.error("Register")},G=()=>{P(!m)},$=n=>{n.preventDefault()},b=n=>{const c=oe(n);z(c),D(ae(c))};return d.useEffect(()=>{b("123456")},[]),e.jsxs(e.Fragment,{children:[e.jsxs(t,{container:!0,direction:"column",justifyContent:"center",spacing:2,children:[e.jsx(t,{item:!0,xs:12,children:e.jsx(v,{children:e.jsxs(h,{variant:"outlined",fullWidth:!0,onClick:B,size:"large",sx:{color:"grey.700",backgroundColor:s.palette.grey[50],borderColor:s.palette.grey[100]},children:[e.jsx(i,{sx:{mr:{xs:1,sm:2,width:20}},children:e.jsx("img",{src:Z,alt:"google",width:16,height:16,style:{marginRight:f?8:16}})}),"Sign up with Google"]})})}),e.jsx(t,{item:!0,xs:12,children:e.jsxs(i,{sx:{alignItems:"center",display:"flex"},children:[e.jsx(j,{sx:{flexGrow:1},orientation:"horizontal"}),e.jsx(h,{variant:"outlined",sx:{cursor:"unset",m:2,py:.5,px:7,borderColor:`${s.palette.grey[100]} !important`,color:`${s.palette.grey[900]}!important`,fontWeight:500,borderRadius:`${E.borderRadius}px`},disableRipple:!0,disabled:!0,children:"OR"}),e.jsx(j,{sx:{flexGrow:1},orientation:"horizontal"})]})}),e.jsx(t,{item:!0,xs:12,container:!0,alignItems:"center",justifyContent:"center",children:e.jsx(i,{sx:{mb:2},children:e.jsx(a,{variant:"subtitle1",children:"Sign up with Email address"})})})]}),e.jsx(J,{initialValues:{email:"",password:"",submit:null},validationSchema:Q().shape({email:R().email("Must be a valid email").max(255).required("Email is required"),password:R().max(255).required("Password is required")}),children:({errors:n,handleBlur:c,handleChange:y,handleSubmit:L,isSubmitting:T,touched:u,values:C})=>e.jsxs("form",{noValidate:!0,onSubmit:L,...r,children:[e.jsxs(t,{container:!0,spacing:f?0:2,children:[e.jsx(t,{item:!0,xs:12,sm:6,children:e.jsx(S,{fullWidth:!0,label:"First Name",margin:"normal",name:"fname",type:"text",defaultValue:"",sx:{...s.typography.customInput}})}),e.jsx(t,{item:!0,xs:12,sm:6,children:e.jsx(S,{fullWidth:!0,label:"Last Name",margin:"normal",name:"lname",type:"text",defaultValue:"",sx:{...s.typography.customInput}})})]}),e.jsxs(p,{fullWidth:!0,error:!!(u.email&&n.email),sx:{...s.typography.customInput},children:[e.jsx(k,{htmlFor:"outlined-adornment-email-register",children:"Email Address / Username"}),e.jsx(I,{id:"outlined-adornment-email-register",type:"email",value:C.email,name:"email",onBlur:c,onChange:y,inputProps:{}}),u.email&&n.email&&e.jsx(g,{error:!0,id:"standard-weight-helper-text--register",children:n.email})]}),e.jsxs(p,{fullWidth:!0,error:!!(u.password&&n.password),sx:{...s.typography.customInput},children:[e.jsx(k,{htmlFor:"outlined-adornment-password-register",children:"Password"}),e.jsx(I,{id:"outlined-adornment-password-register",type:m?"text":"password",value:C.password,name:"password",label:"Password",onBlur:c,onChange:x=>{y(x),b(x.target.value)},endAdornment:e.jsx(N,{position:"end",children:e.jsx(V,{"aria-label":"toggle password visibility",onClick:G,onMouseDown:$,edge:"end",size:"large",children:m?e.jsx(Y,{}):e.jsx(K,{})})}),inputProps:{}}),u.password&&n.password&&e.jsx(g,{error:!0,id:"standard-weight-helper-text-password-register",children:n.password})]}),W!==0&&e.jsx(p,{fullWidth:!0,children:e.jsx(i,{sx:{mb:2},children:e.jsxs(t,{container:!0,spacing:2,alignItems:"center",children:[e.jsx(t,{item:!0,children:e.jsx(i,{style:{backgroundColor:o==null?void 0:o.color},sx:{width:85,height:8,borderRadius:"7px"}})}),e.jsx(t,{item:!0,children:e.jsx(a,{variant:"subtitle1",fontSize:"0.75rem",children:o==null?void 0:o.label})})]})})}),e.jsx(t,{container:!0,alignItems:"center",justifyContent:"space-between",children:e.jsx(t,{item:!0,children:e.jsx(_,{control:e.jsx(X,{checked:F,onChange:x=>M(x.target.checked),name:"checked",color:"primary"}),label:e.jsxs(a,{variant:"subtitle1",children:["Agree with  ",e.jsx(a,{variant:"subtitle1",component:w,to:"#",children:"Terms & Condition."})]})})})}),n.submit&&e.jsx(i,{sx:{mt:3},children:e.jsx(g,{error:!0,children:n.submit})}),e.jsx(i,{sx:{mt:2},children:e.jsx(v,{children:e.jsx(h,{disableElevation:!0,disabled:T,fullWidth:!0,size:"large",type:"submit",variant:"contained",color:"secondary",children:"Sign up"})})})]})})]})},ue=()=>{const r=A(s=>s.breakpoints.down("md"));return e.jsx(ee,{children:e.jsxs(t,{container:!0,direction:"column",justifyContent:"flex-end",sx:{minHeight:"100vh"},children:[e.jsx(t,{item:!0,xs:12,children:e.jsx(t,{container:!0,justifyContent:"center",alignItems:"center",sx:{minHeight:"calc(100vh - 68px)"},children:e.jsx(t,{item:!0,sx:{m:{xs:1,sm:3},mb:0},children:e.jsx(te,{children:e.jsxs(t,{container:!0,spacing:2,alignItems:"center",justifyContent:"center",children:[e.jsx(t,{item:!0,sx:{mb:3},children:e.jsx(w,{to:"#","aria-label":"theme logo",children:e.jsx(O,{})})}),e.jsx(t,{item:!0,xs:12,children:e.jsx(t,{container:!0,direction:{xs:"column-reverse",md:"row"},alignItems:"center",justifyContent:"center",children:e.jsx(t,{item:!0,children:e.jsxs(U,{alignItems:"center",justifyContent:"center",spacing:1,children:[e.jsx(a,{color:"secondary.main",gutterBottom:!0,variant:r?"h3":"h2",children:"Sign up"}),e.jsx(a,{variant:"caption",fontSize:"16px",textAlign:{xs:"center",md:"inherit"},children:"Enter your credentials to continue"})]})})})}),e.jsx(t,{item:!0,xs:12,children:e.jsx(le,{})}),e.jsx(t,{item:!0,xs:12,children:e.jsx(j,{})}),e.jsx(t,{item:!0,xs:12,children:e.jsx(t,{item:!0,container:!0,direction:"column",alignItems:"center",xs:12,children:e.jsx(a,{component:w,to:"/pages/login/login3",variant:"subtitle1",sx:{textDecoration:"none"},children:"Already have an account?"})})})]})})})})}),e.jsx(t,{item:!0,xs:12,sx:{m:3,mt:1},children:e.jsx(re,{})})]})})};export{ue as default};
