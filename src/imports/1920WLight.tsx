import imgPrimeControl from "figma:asset/a0d2e91fe30a3ed67d7934c34a6512e942d5c35b.png";

function PrimeControl() {
  return (
    <div className="h-[48.05px] relative shrink-0 w-[50px]" data-name="Prime Control">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <img alt="" className="absolute left-0 max-w-none size-full top-0" src={imgPrimeControl} />
      </div>
    </div>
  );
}

function ImgPrimeControlMargin() {
  return (
    <div className="content-stretch flex flex-col items-start pr-[20px] relative shrink-0 w-[70px]" data-name="Img - Prime Control:margin">
      <PrimeControl />
    </div>
  );
}

function Heading() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Heading 1">
      <div className="flex flex-col font-['Titillium_Web:SemiBold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[32px] text-white whitespace-nowrap">
        <p className="leading-[normal]">Gerador de assinaturas de e-mail - Prime Control</p>
      </div>
    </div>
  );
}

function Header() {
  return (
    <div className="bg-gradient-to-r from-[#002753] relative shrink-0 to-[#004a8f] w-full" data-name="Header">
      <div className="flex flex-row items-center justify-center size-full">
        <div className="content-stretch flex items-center justify-center p-[20px] relative w-full">
          <ImgPrimeControlMargin />
          <Heading />
        </div>
      </div>
    </div>
  );
}

function Heading1() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-[46px] right-[40px] top-[61.58px]" data-name="Heading 2">
      <div className="flex flex-col font-['Titillium_Web:Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#002753] text-[26px] whitespace-nowrap">
        <p className="leading-[normal]">Passo 1 – Preencha seus dados</p>
      </div>
    </div>
  );
}

function Label() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-[46px] right-[40px] top-[120.58px]" data-name="Label">
      <div className="flex flex-col font-['Titillium_Web:SemiBold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#002753] text-[16px] whitespace-nowrap">
        <p className="leading-[normal]">Nome completo *</p>
      </div>
    </div>
  );
}

function Container() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start overflow-clip relative rounded-[inherit] w-full">
        <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#757575] text-[14.3px] w-full">
          <p className="leading-[normal]">Ex: Pedro de Alcântara F. e Bourbon</p>
        </div>
      </div>
    </div>
  );
}

function Input() {
  return (
    <div className="absolute bg-white left-[46px] right-[40px] rounded-[8px] top-[150.58px]" data-name="Input">
      <div className="content-stretch flex items-start justify-center overflow-clip px-[15px] py-[16px] relative rounded-[inherit] w-full">
        <Container />
      </div>
      <div aria-hidden="true" className="absolute border border-[#ccc] border-solid inset-0 pointer-events-none rounded-[8px]" />
    </div>
  );
}

function Label1() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-[46px] right-[40px] top-[219.58px]" data-name="Label">
      <div className="flex flex-col font-['Titillium_Web:SemiBold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#002753] text-[16px] whitespace-nowrap">
        <p className="leading-[normal]">E-mail corporativo *</p>
      </div>
    </div>
  );
}

function Container1() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start overflow-clip relative rounded-[inherit] w-full">
        <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#757575] text-[14.1px] w-full">
          <p className="leading-[normal]">nome.sobrenome@primecontrol.com.br</p>
        </div>
      </div>
    </div>
  );
}

function Input1() {
  return (
    <div className="absolute bg-white left-[46px] right-[40px] rounded-[8px] top-[249.58px]" data-name="Input">
      <div className="content-stretch flex items-start justify-center overflow-clip px-[15px] py-[16px] relative rounded-[inherit] w-full">
        <Container1 />
      </div>
      <div aria-hidden="true" className="absolute border border-[#ccc] border-solid inset-0 pointer-events-none rounded-[8px]" />
    </div>
  );
}

function Label2() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-[46px] right-[40px] top-[318.58px]" data-name="Label">
      <div className="flex flex-col font-['Titillium_Web:SemiBold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#002753] text-[16px] whitespace-nowrap">
        <p className="leading-[normal]">Time / Cargo *</p>
      </div>
    </div>
  );
}

function Container2() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start overflow-clip relative rounded-[inherit] w-full">
        <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#757575] text-[14.3px] w-full">
          <p className="leading-[normal]">Ex: Marketing</p>
        </div>
      </div>
    </div>
  );
}

function Input2() {
  return (
    <div className="absolute bg-white left-[46px] right-[40px] rounded-[8px] top-[348.58px]" data-name="Input">
      <div className="content-stretch flex items-start justify-center overflow-clip px-[15px] py-[16px] relative rounded-[inherit] w-full">
        <Container2 />
      </div>
      <div aria-hidden="true" className="absolute border border-[#ccc] border-solid inset-0 pointer-events-none rounded-[8px]" />
    </div>
  );
}

function Label3() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-[46px] right-[40px] top-[417.58px]" data-name="Label">
      <div className="flex flex-col font-['Titillium_Web:SemiBold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#002753] text-[16px] whitespace-nowrap">
        <p className="leading-[normal]">Celular</p>
      </div>
    </div>
  );
}

function Container4() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start overflow-clip relative rounded-[inherit] w-full">
        <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#757575] text-[15px] w-full">
          <p className="leading-[normal]">DDD</p>
        </div>
      </div>
    </div>
  );
}

function Input3() {
  return (
    <div className="bg-white relative rounded-[8px] self-stretch shrink-0 w-[80px]" data-name="Input">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col items-start px-[15px] py-[16px] relative size-full">
          <Container4 />
        </div>
      </div>
      <div aria-hidden="true" className="absolute border border-[#ccc] border-solid inset-0 pointer-events-none rounded-[8px]" />
    </div>
  );
}

function Container5() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start overflow-clip relative rounded-[inherit] w-full">
        <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#757575] text-[13.7px] w-full">
          <p className="leading-[normal]">91234-5678</p>
        </div>
      </div>
    </div>
  );
}

function Input4() {
  return (
    <div className="bg-white flex-[1_0_0] min-h-px min-w-px relative rounded-[8px] self-stretch" data-name="Input">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col items-start px-[15px] py-[16px] relative size-full">
          <Container5 />
        </div>
      </div>
      <div aria-hidden="true" className="absolute border border-[#ccc] border-solid inset-0 pointer-events-none rounded-[8px]" />
    </div>
  );
}

function Container3() {
  return (
    <div className="absolute content-stretch flex gap-[10px] h-[50px] items-start left-[46px] right-[40px] top-[447.58px]" data-name="Container">
      <Input3 />
      <Input4 />
    </div>
  );
}

function Label4() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-[46px] right-[40px] top-[516.58px]" data-name="Label">
      <div className="flex flex-col font-['Titillium_Web:SemiBold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#002753] text-[16px] whitespace-nowrap">
        <p className="leading-[normal]">Telefone fixo</p>
      </div>
    </div>
  );
}

function Container7() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start overflow-clip relative rounded-[inherit] w-full">
        <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#757575] text-[15px] w-full">
          <p className="leading-[normal]">DDD</p>
        </div>
      </div>
    </div>
  );
}

function Input5() {
  return (
    <div className="bg-white relative rounded-[8px] self-stretch shrink-0 w-[80px]" data-name="Input">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col items-start px-[15px] py-[16px] relative size-full">
          <Container7 />
        </div>
      </div>
      <div aria-hidden="true" className="absolute border border-[#ccc] border-solid inset-0 pointer-events-none rounded-[8px]" />
    </div>
  );
}

function Container8() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start overflow-clip relative rounded-[inherit] w-full">
        <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#757575] text-[13.7px] w-full">
          <p className="leading-[normal]">1234-5678</p>
        </div>
      </div>
    </div>
  );
}

function Input6() {
  return (
    <div className="bg-white flex-[1_0_0] min-h-px min-w-px relative rounded-[8px] self-stretch" data-name="Input">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col items-start px-[15px] py-[16px] relative size-full">
          <Container8 />
        </div>
      </div>
      <div aria-hidden="true" className="absolute border border-[#ccc] border-solid inset-0 pointer-events-none rounded-[8px]" />
    </div>
  );
}

function Container6() {
  return (
    <div className="absolute content-stretch flex gap-[10px] h-[50px] items-start left-[46px] right-[40px] top-[546.58px]" data-name="Container">
      <Input5 />
      <Input6 />
    </div>
  );
}

function Label5() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-[46px] right-[40px] top-[615.58px]" data-name="Label">
      <div className="flex flex-col font-['Titillium_Web:SemiBold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#002753] text-[16px] whitespace-nowrap">
        <p className="leading-[normal]">Skype ID</p>
      </div>
    </div>
  );
}

function Container9() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start overflow-clip relative rounded-[inherit] w-full">
        <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#757575] text-[14.1px] w-full">
          <p className="leading-[normal]">seu.skype.id</p>
        </div>
      </div>
    </div>
  );
}

function Input7() {
  return (
    <div className="absolute bg-white left-[46px] right-[40px] rounded-[8px] top-[645.58px]" data-name="Input">
      <div className="content-stretch flex items-start justify-center overflow-clip px-[15px] py-[16px] relative rounded-[inherit] w-full">
        <Container9 />
      </div>
      <div aria-hidden="true" className="absolute border border-[#ccc] border-solid inset-0 pointer-events-none rounded-[8px]" />
    </div>
  );
}

function Input8() {
  return (
    <div className="absolute bg-[#f47920] content-stretch flex items-start justify-center left-[46px] overflow-clip pb-[13px] pt-[12px] px-[24px] rounded-[8px] top-[724.58px]" data-name="Input">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[15.1px] text-center text-white whitespace-nowrap">
        <p className="leading-[normal]">Gerar Assinatura</p>
      </div>
    </div>
  );
}

function BackgroundVerticalBorderShadow() {
  return (
    <div className="bg-white h-[806.58px] relative rounded-[12px] shrink-0 w-full" data-name="Background+VerticalBorder+Shadow">
      <div aria-hidden="true" className="absolute border-[#f47920] border-l-6 border-solid inset-0 pointer-events-none rounded-[12px] shadow-[0px_4px_12px_0px_rgba(0,0,0,0.05)]" />
      <Heading1 />
      <Label />
      <Input />
      <Label1 />
      <Input1 />
      <Label2 />
      <Input2 />
      <Label3 />
      <Container3 />
      <Label4 />
      <Container6 />
      <Label5 />
      <Input7 />
      <Input8 />
    </div>
  );
}

function Heading2() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Heading 2">
      <div className="flex flex-col font-['Titillium_Web:Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#002753] text-[26px] w-full">
        <p className="leading-[normal]">Passo 2 – Visualize e copie sua assinatura</p>
      </div>
    </div>
  );
}

function Iframe() {
  return (
    <div className="bg-white h-[402px] relative rounded-[8px] shrink-0 w-[876px]" data-name="Iframe">
      <div aria-hidden="true" className="absolute border border-[#ccc] border-solid inset-0 pointer-events-none rounded-[8px]" />
    </div>
  );
}

function Button() {
  return (
    <div className="bg-[#f47920] content-stretch flex items-center justify-center px-[14px] py-[8px] relative rounded-[6px] shrink-0" data-name="Button">
      <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold justify-center leading-[0] not-italic relative shrink-0 text-[13.7px] text-center text-white whitespace-nowrap">
        <p className="leading-[normal]">Copiar Código</p>
      </div>
    </div>
  );
}

function Heading3() {
  return (
    <div className="content-stretch flex items-start pt-[4.72px] relative shrink-0 w-full" data-name="Heading 3">
      <div className="flex flex-col font-['Titillium_Web:Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#002753] text-[18.7px] whitespace-nowrap">
        <p className="leading-[normal]">{`Código-fonte: `}</p>
      </div>
      <Button />
    </div>
  );
}

function BackgroundBorder() {
  return (
    <div className="bg-white h-[320.72px] relative rounded-[8px] shrink-0 w-[896px]" data-name="Background+Border">
      <div aria-hidden="true" className="absolute border border-[#ccc] border-solid inset-0 pointer-events-none rounded-[8px]" />
    </div>
  );
}

function BackgroundVerticalBorderShadow1() {
  return (
    <div className="bg-white relative rounded-[12px] shrink-0 w-full" data-name="Background+VerticalBorder+Shadow">
      <div aria-hidden="true" className="absolute border-[#f47920] border-l-6 border-solid inset-0 pointer-events-none rounded-[12px] shadow-[0px_4px_12px_0px_rgba(0,0,0,0.05)]" />
      <div className="content-stretch flex flex-col gap-[20px] items-start pb-[40.01px] pl-[46px] pr-[40px] pt-[61.57px] relative w-full">
        <Heading2 />
        <Iframe />
        <Heading3 />
        <BackgroundBorder />
      </div>
    </div>
  );
}

function Form() {
  return (
    <div className="content-stretch flex flex-col gap-[40px] items-start relative shrink-0 w-[960px]" data-name="Form">
      <BackgroundVerticalBorderShadow />
      <BackgroundVerticalBorderShadow1 />
    </div>
  );
}

export default function Component1920WLight() {
  return (
    <div className="content-stretch flex flex-col gap-[60px] items-center pb-[100px] relative size-full" data-name="1920w light" style={{ backgroundImage: "linear-gradient(90deg, rgb(245, 248, 252) 0%, rgb(245, 248, 252) 100%), linear-gradient(90deg, rgb(255, 255, 255) 0%, rgb(255, 255, 255) 100%)" }}>
      <Header />
      <Form />
    </div>
  );
}