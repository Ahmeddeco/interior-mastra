import BotChat from "@/components/shared/BotChat"

export default function BotPage() {
	return (
		<BotChat
			apiRoute={"/api/chat"}
			placeholder={{
				en: "Write what you need?",
				ar: "أكتب ما تريده هنا",
			}}
			emptyTitle={{
				en: "Hello, I'm Deco Bot",
				ar: "مرحبا, أنا ديكو بوت",
			}}
			emptyDescription={{
				en: "Your smart assistant to provide you with solutions in your interior space",
				ar: "مساعدك الذكي لاقدم لك حلولا في مساحتك الداخلية ",
			}}
		/>
	)
}
