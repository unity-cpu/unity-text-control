using System;
using System.Collections;
using TMPro;
using UnityEngine;
using UnityEngine.Networking;

public class UnityTextController : MonoBehaviour
{
    [Header("Vercel API")]
    public string apiUrl = "https://YOUR-PROJECT.vercel.app/api/get-text";

    [Header("Unity UI")]
    public TMP_Text targetText;

    [Header("Polling")]
    [Min(0.2f)]
    public float pollEverySeconds = 1f;

    private string lastText = null;

    private void Start()
    {
        StartCoroutine(PollText());
    }

    private IEnumerator PollText()
    {
        while (true)
        {
            yield return GetText();
            yield return new WaitForSeconds(pollEverySeconds);
        }
    }

    private IEnumerator GetText()
    {
        using (UnityWebRequest request = UnityWebRequest.Get(apiUrl))
        {
            request.SetRequestHeader("Cache-Control", "no-cache");
            yield return request.SendWebRequest();

            if (request.result != UnityWebRequest.Result.Success)
            {
                Debug.LogWarning("Unity Text Control: " + request.error);
                yield break;
            }

            try
            {
                TextResponse response =
                    JsonUtility.FromJson<TextResponse>(request.downloadHandler.text);

                if (response != null && response.text != null && response.text != lastText)
                {
                    lastText = response.text;

                    if (targetText != null)
                        targetText.text = lastText;
                }
            }
            catch (Exception e)
            {
                Debug.LogWarning("Unity Text Control JSON error: " + e.Message);
            }
        }
    }

    [Serializable]
    private class TextResponse
    {
        public string text;
    }
}
