import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
    // Seed Sections - カスタムコンテンツ
    const sections = [
        // Hero
        { key: "hero_title_1", content: "やってみるって" },
        { key: "hero_title_2", content: "おもしろい！" },
        {
            key: "hero_desc", content: `AIのおかげで広がった私の世界。
これは街のコーヒー屋さんの、もう1つの顔。
みんなと一緒にワクワクしたい！` },
        // Vision
        { key: "vision_label", content: "なぜ作るのか" },
        { key: "vision_title", content: "熱意は伝染する" },
        {
            key: "vision_text_1", content: `何かに一生懸命取り組むのってカッコいい。
今まで出来なかったことが出来るようになるって楽しい。
` },
        {
            key: "vision_text_2", content: `僕たちは技術の力でもっと毎日を楽しくできるから。
とにかくやってみよう、熱意は伝染していく！` },
        // Mission
        { key: "mission_label", content: "何を作るのか" },
        { key: "mission_title", content: "そして、何のために作るのか？" },
        { key: "mission_card_1_title", content: "まずは自分のため？" },
        {
            key: "mission_card_1_desc", content: `コーヒー屋さんとして必要なもの、投資家として必要なもの、日常生活で必要なもの。
生活の中には、さまざまなニーズがあるから、自分の声を拾っていく作業をしています。` },
        { key: "mission_card_2_title", content: "毎日を楽しむため？" },
        {
            key: "mission_card_2_desc", content: `僕らが生きる毎日は楽しくないとね。
だから、毎日を楽しく、便利にするものを作ります。
ものが売れるような販促ツール、みんなが遊んでくれるゲーム、日々の細かいタスクを楽にするアプリを、とにかく作ります。` },
        { key: "mission_card_3_title", content: "誰かのために。" },
        {
            key: "mission_card_3_desc", content: `自分を助けるツールは、誰かを助けるかもしれません。
みんなの生活を豊かにするために、自分にできることがあるはずです。` },
        // Process
        { key: "process_label", content: "どのように作っているのか？" },
        { key: "process_title", content: "プログラミング未経験の開発のリアル" },
        { key: "process_step_1_title", content: "急に思いつく" },
        { key: "process_step_1_desc", content: "特に夜寝ようとしてる時に閃いてしまうことが多い" },
        { key: "process_step_2_title", content: "とりあえずプロンプト" },
        { key: "process_step_2_desc", content: "要件定義させるためのプロンプトを作成させる(ややこしい)" },
        { key: "process_step_3_title", content: "最高の相棒Antigravityにぶん投げてみる" },
        { key: "process_step_3_desc", content: "プロンプトをIDEに投げて、へとへとになるまで作ってみるのが大事" },
        { key: "process_step_4_title", content: "最終的な仕上がりに妥協しない" },
        { key: "process_step_4_desc", content: "えいやで作ったとしてもサービスとして破綻していたら無意味なので隅々までこだわります" },
        { key: "process_tech_label", content: "技術スタック" },
        { key: "process_tech_stack", content: "Next.js, React, TypeScript, Tailwind CSS, Framer Motion, Shadcn UI, Node.js, Vercel" },
        // Works
        { key: "works_label", content: "いままで何を作ってきたのか？" },
        { key: "works_title", content: "作品例(ポートフォリオ)" },
        // Contact
        { key: "contact_label", content: "連絡はこちらへ" },
        { key: "contact_title", content: "どれでも連絡とれます" },
        {
            key: "contact_desc", content: `変な人だなあ、友達になりたいなあ。
そう思ってもらえましたか？

インスタの顔、Twitterの顔、そしてオフィシャルなメールの顔。

どれを選んでも後悔はさせませんよ。` },
        { key: "x_username", content: "pudding_eatin" },
        { key: "instagram_username", content: "salvadorcoffeee" },
        { key: "contact_email", content: "salvadorcoffeebar@gmail.com" },
    ]

    for (const s of sections) {
        await prisma.section.upsert({
            where: { key: s.key },
            update: { content: s.content },
            create: s,
        })
    }

    // Seed Projects - カスタムプロジェクトデータ
    const projects = [
        {
            title: "サルバのコーヒー診断アプリ",
            desc: "あなたの好きなコーヒーが5秒でわかる。世界で一番すごい診断アプリ。",
            url: "https://sites.google.com/view/salvacoffeeshindan?pli=1",
            thumbnail: "/projects/coffee-shindan.png",
            displayOrder: 0
        },
        {
            title: "コーヒー豆原価計算アプリ(最新版)",
            desc: "生豆、手数料、歩留まり、ボリュームディスカウント、損益分岐など、コーヒー屋にとっての必須アプリ！",
            url: "https://coffeecostaccounting-salvadorcoffee.streamlit.app/",
            thumbnail: "/projects/coffee-cost.png",
            displayOrder: 1
        },
        {
            title: "AIサルバさん",
            desc: "オンラインショップのエージェント。そんじょそこらのチャットボットではない。最強。",
            url: "https://ai-salva-chat.vercel.app/",
            displayOrder: 2
        },
        {
            title: "Super Pacamara Bros",
            desc: "どこかでみたようなマ○オ風のゲーム。クリスマス商品の販促用に開発。Typescriptを初めて触った記念。",
            url: "https://super-pacamara-bros-xmas.vercel.app/",
            displayOrder: 3
        },
        {
            title: "ヒデちゃんのTime Shockゲーム",
            desc: "テレビ千鳥で大悟さんが作ってほしいと言っていたゲームを完全再現。おもしろすぎる。",
            url: "https://mochimochikittypunk.github.io/time-shock/",
            displayOrder: 4
        },
        {
            title: "店頭販促ルーレット(パリ五輪柔道デザイン)",
            desc: "買い物するとルーレットを回せる。柔道パリ五輪の八百長ルーレット！",
            url: "https://roulette-rho-one.vercel.app/",
            displayOrder: 5
        }
    ]

    // Clear existing projects and recreate
    await prisma.project.deleteMany({});
    for (const p of projects) {
        await prisma.project.create({ data: p });
    }

    console.log("Seeding completed.")
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })
